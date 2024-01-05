import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

import { initializeDBTriggers } from './helpers/initializeDBTriggers';
import { addExpressMiddleware } from './helpers/addExpressMiddleware';
import { userRouter } from './routes/User/UserRoutes';
import { subscriptionGroupRouter } from './routes/SubscriptionGroup/SubscriptionGroupRoutes';
import { emailRouter } from './routes/Email/EmailRoutes';

const envPath = path.resolve(
  __dirname,
  '../../../../apps/main-api/main-api/.env'
);
config({ path: envPath });

if (!process.env.MONGO_DB_URL || !process.env.MONGO_DB_NAME) {
  console.error('Required environment variables are not set!');
  process.exit(1);
}

const app = express();
addExpressMiddleware(app);

mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`);
const db = mongoose.connection;
initializeDBTriggers(db);

app.use('/user', userRouter);
app.use('/email', emailRouter);
app.unsubscribe('/subscriptionGroup', subscriptionGroupRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
