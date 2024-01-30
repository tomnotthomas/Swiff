import User from "../models/User";
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';

export async function createUser (req: Request, res: Response) {

  const {email} = req.body;
  const user = await User.findOne({ email: email });
  if (user) return res.status(409).send({ error: '409', message: 'User already exists' });

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
    console.log('New user created', savedUser)
  } catch (error) {
    res.status(400).send({ error, message: 'Could not save user' });
  }
};