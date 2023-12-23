import jwt from 'jsonwebtoken';
import db from '../config/db.config.js';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword , comparePassword } from '../utils/hash.js';

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    const users = await db.collection('users');
    const existingUser = await users.findOne({
      where: (doc) => doc.email === email,
    });

    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const userId = uuidv4();
    const hashedPassword = await hashPassword(password);

    const userDoc = {
      id: userId,
      email,
      password: hashedPassword,
    };

    await users.add(userDoc);

    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up');
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await db.collection('users');
    const userDoc = await users.findOne({
      where: (doc) => doc.email === email,
    });

    if (!userDoc) {
      return res.status(401).send('Invalid email or password');
    }

    const passwordMatch = await comparePassword(password, userDoc.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid email or password');
    }

    // Generate a JWT token (optional)
    const token = jwt.sign({ userId: userDoc.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
};
