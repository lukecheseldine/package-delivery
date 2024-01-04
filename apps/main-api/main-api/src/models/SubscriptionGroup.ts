import mongoose from 'mongoose';

const subscriptionGroupSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  name: {
    type: String,
    required: true,
    max: 50,
  },
});

export const SubscriptionGroup = mongoose.model(
  'SubscriptionGroup',
  subscriptionGroupSchema
);
