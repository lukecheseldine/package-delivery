import express from 'express';
import { SubscriptionGroup } from '../../models/SubscriptionGroup';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const subscriptionGroups = await SubscriptionGroup.find();
    res.json(subscriptionGroups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const subscriptionGroup = await SubscriptionGroup.findById(req.params.id);
    if (subscriptionGroup) {
      res.json(subscriptionGroup);
    } else {
      res.status(404).json({ message: 'Subscription group not found' });
    }
  } catch (err) {
    res.status(500).send('Error finding subscription group');
  }
});

router.post('/', async (req, res) => {
  const allowedParams = ['name'];
  const receivedParams = Object.keys(req.body);
  if (
    receivedParams.length !== 1 ||
    !receivedParams.every((param) => allowedParams.includes(param))
  ) {
    return res
      .status(400)
      .json({ message: 'Only the "name" parameter is allowed' });
  }
  const subscriptionGroup = new SubscriptionGroup({
    name: req.body.name,
  });
  try {
    const newSubscriptionGroup = await subscriptionGroup.save();
    res.status(201).json(newSubscriptionGroup);
  } catch (err) {
    res.status(500).send('Error creating subscription group');
  }
});

// Create route to update a subscription group by ID
router.patch('/:id', async (req, res) => {
  try {
    const allowedParams = ['name'];
    const receivedParams = Object.keys(req.body);
    if (!receivedParams.every((param) => allowedParams.includes(param))) {
      return res
        .status(400)
        .json({ message: 'Only the "name" parameter is allowed for update' });
    }
    const updatedSubscriptionGroup = await SubscriptionGroup.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (updatedSubscriptionGroup) {
      res.json(updatedSubscriptionGroup);
    } else {
      res.status(404).json({ message: 'Subscription group not found' });
    }
  } catch (err) {
    res.status(500).json('Error updating subscription group');
  }
});

export { router as subscriptionGroupRouter };
