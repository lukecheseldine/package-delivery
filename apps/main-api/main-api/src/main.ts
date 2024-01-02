import express from 'express';
import mongoose, { Schema } from 'mongoose';
import 'dotenv/config';

import { initializeDBTriggers } from './helpers/initializeDBTriggers';
import { addExpressMiddleware } from './helpers/addExpressMiddleware';

if (!process.env.MONGO_URL || !process.env.SUBSCRIPTIONS_DB_NAME) {
  console.error('Required environment variables are not set!');
  process.exit(1);
}

const app = express();
addExpressMiddleware(app);

mongoose.connect(
  `${process.env.MONGO_URL}/${process.env.SUBSCRIPTIONS_DB_NAME}`
);
const db = mongoose.connection;
initializeDBTriggers(db);

const subscriptionSchema = new Schema({
  email: String,
  phone: String,
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

app.post('/subscription', async (req, res) => {
  if (!req.body.email || !req.body.phone) {
    res.status(400).send('Bad Request: Missing required field');
  }

  const newSubscription = new Subscription({
    email: req.body.email,
    phone: req.body.phone,
  });
  try {
    await newSubscription.save();
    res.status(200).json({
      email: newSubscription.email,
      phone: newSubscription.phone,
    });
  } catch (error) {
    console.error(`Error saving subscription: ${error}`);
    res.status(500).send('Unable to save subscription');
  }
});

app.delete('/subscription', async (req, res) => {
  if (!req.body.email || !req.body.phone) {
    res.status(400).send('Bad Request: Missing required field');
  }
  try {
    await Subscription.deleteMany({
      email: req.body.email,
      phone: req.body.phone,
    });
    res.status(200).json({
      email: req.body.email,
      phone: req.body.phone,
    });
  } catch (error) {
    console.error(`Error deleting subscription: ${error}`);
    res.status(500).send('Unable to delete subscription');
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
