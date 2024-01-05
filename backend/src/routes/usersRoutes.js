import express from 'express';
import { User } from '../models/User';

const router = express.Router();

router.post('/users', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  export default router;
