
import { Request, Response, NextFunction } from 'express';
import User from "../models/user.js";
// import {Request, Response} from 'express';

export async function createUser (req: Request, res: Response): Promise<void> {
  console.log(req.body)
  const {email} = req.body;
  const user = await User.findOne({ email: email });
  if (user){
    res.status(409)
    .send({ error: '409', message: 'User already exists' });
    return;
  }
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