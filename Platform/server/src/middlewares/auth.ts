import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;
import { Request, Response, NextFunction } from 'express';

export async function auth (req: any, res: any, next: any): Promise<void> {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, jwtSecret!);

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    next();

  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request to auth!"),
    });
  }
};

export async function authByToken (req: any, res: any, next: any): Promise<void> {
  try {
    //   get the token from the authorization header
    const token = await req.cookies.TOKEN;

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, jwtSecret!);

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    req.user = user;

    // pass down functionality to the endpoint
    next();

  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request to auth Token!"),
    });
  }
};
