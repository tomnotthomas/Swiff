import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET || "DEFAULT_SECRET";

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

export async function authUser (req: Request, res: Response) {

  // check if email exists
  User.findOne({ email: req.body.email })

  // if email exists
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    // compare the password entered and the hashed password found
    bcrypt
      .compare(req.body.password, user.password)

      // if the passwords match
      .then((passwordCheck) => {

        // check if password matches
        if(!passwordCheck) {
          return res.status(400).send({
            message: "Passwords does not match",
          });
        }

        //   create JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          jwtSecret,
          { expiresIn: "24h" }
        );

        //   return success response
        res.status(200).send({
          message: "Login Successful",
          email: user.email,
          token,
        });
      })
      // catch error if password does not match
      .catch((error) => {
        res.status(400).send({
          message: "Passwords does not match",
          error,
        });
      });
  })
  // catch error if email does not exist
  .catch((e) => {
    res.status(404).send({
      message: "Email not found",
      e,
    });
  });
}

