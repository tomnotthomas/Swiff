import { Request, Response} from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import User from '../models/User.js';
import generateVmName from '../helpers/instance-resource-name-generator.js';

dotenv.config();
interface User {
  userEmail: string;
}

export const getSteamId = async (req: Request, res: Response) => {
  try {
    const steamIdString = req.query['openid.claimed_id'] as string;
    const steamId = steamIdString.substring(steamIdString.length - 17);
    const email = (req.user as User).userEmail;
    const user = await User.findOne({ email: email });
    
    if(user){
      await user.save();
    }

    if (!user) {
      res.status(404).send({ error: '404', message: 'User not found' });
      return;
    }
    user.steamID = steamId;
    await user.save();

    res.redirect('http://localhost:3000/auth/steam/return')
  } catch (err: unknown) {
    if(err instanceof Error){
    res.status(500).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'an unkown error occurred'})
    }
  }
};

export const getSteamGames = async (req: Request, res: Response) => {
  const {userEmail} = req.body;
  console.log(req.body, 'req body')
  const user = await User.findOne({ email: userEmail });
  console.log(user)
  // if (!user){
  //   res.status(404)
  //   .send({ error: '404', message: 'User not found' });
  //   return;
  // }

  try {
    // const email = req.user.userEmail as {email: string};
    // const user = await User.findOne({ email: email });
    // console.log(user)

    // const cookies = req.cookies;


    const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.REACT_APP_STEAM_API_KEY}&steamid=${process.env.REACT_APP_STEAM_ID}&format=json&include_appinfo=true`);
    const data: any = await response.json();

    // const games = data.response.games;
    // user.games = games;
    // await user.save();

    res.json(data);
    // console.log('Data from getStemGames', data.response.games);
  } catch (err: unknown) {
    if(err instanceof Error){
    res.status(500).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'an unkown error occurred'})
    }
  }
};

