import express from 'express';
import { User } from '../../models/UserModel';

export const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error fetching user');
  }
});

router.post('/', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    res.status(400).send('Missing required fields');
  }
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
      res.status(400).send('Email already exists');
    } else {
      res.status(500).send('Error saving user');
    }
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const allowedUpdates = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'emailVerified',
      'phoneVerified',
    ];

    const isValidOperation = Object.keys(updates).every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates' });
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ error: 'Invalid updates' });
    } else {
      res.status(500).send('Error updating user');
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
});

export { router as userRouter };
