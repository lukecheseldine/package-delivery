import mongoose from 'mongoose';
import { Email } from './EmailModel';
import { SubscriptionGroupMembership } from './SubscriptionGroupMembership';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Example: 1234567890
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Please provide exactly 10 digits.`,
    },
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  phoneVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  secondsBeforeNotifying: {
    type: Number,
    default: 600,
    required: true,
  },
});

/* If a user is deleted, cascade the delete to:
    - their Emails
    - their SubscriptionGroupMemberships
*/
userSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function () {
    try {
      await Email.deleteMany({ owner: this._id });
      await SubscriptionGroupMembership.deleteMany({ user: this._id });
    } catch (error) {
      console.error(`Error cascading user delete: ${error}`);
    }
  }
);

userSchema.pre(
  'deleteOne',
  { query: true, document: false },
  async function () {
    try {
      const deletedUser = await this.exec();
      console.log(deletedUser);
      await Email.deleteMany({ owner: deletedUser._id });
      await SubscriptionGroupMembership.deleteMany({ user: deletedUser._id });
    } catch (error) {
      console.error(`Error cascading user delete: ${error}`);
    }
  }
);

export const User = mongoose.model('User', userSchema);
