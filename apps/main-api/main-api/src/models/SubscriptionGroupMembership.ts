import mongoose from 'mongoose';

const subscriptionGroupMembershipSchema = new mongoose.Schema({
  subscriptionGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionGroup',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Make the combination of subscriptionGroup and user fields unique
subscriptionGroupMembershipSchema.index(
  { subscriptionGroup: 1, user: 1 },
  { unique: true }
);

export const SubscriptionGroupMembership = mongoose.model(
  'SubscriptionGroupMembership',
  subscriptionGroupMembershipSchema
);
