import express from 'express';
import { Email } from '../../models/EmailModel';
import { User } from '../../models/UserModel';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (
      Object.keys(req.body).length !== 2 ||
      !req.body.email ||
      !req.body.ownerId
    ) {
      return res.status(400).send('email and ownerId are required');
    }
    const user = await User.findById(req.body.ownerId);
    if (!user) {
      return res.status(400).send('User does not exist');
    }
    const email = new Email(req.body);
    await email.save();
    res.status(201).send(email);
  } catch (err) {
    res.status(500).send('Error creating email');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) {
      return res.status(404).send();
    }
    res.send(email);
  } catch (err) {
    res.status(500).send('Error finding email');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const email = await Email.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!email) {
      return res.status(404).send();
    }
    res.send(email);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send(err.message);
    } else {
      res.status(500).send('Error updating email');
    }
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const email = await Email.findByIdAndDelete(req.params.id);
    if (!email) {
      return res.status(404).send();
    }
    res.send(email);
  } catch (err) {
    res.status(500).send('Error deleting email');
  }
});

export { router as emailRouter };
