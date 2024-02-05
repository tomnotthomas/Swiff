import fetch from 'node-fetch';
import dotenv from 'dotenv';
import User from '../models/User.js';
dotenv.config();
export const getSteamId = async (req, res) => {
    try {
        const steamIdString = req.query['openid.claimed_id'];
        const steamId = steamIdString.substring(steamIdString.length - 17);
        const email = req.user.userEmail;
        const user = await User.findOne({ email: email });
        if (user) {
            await user.save();
        }
        if (!user) {
            res.status(404).send({ error: '404', message: 'User not found' });
            return;
        }
        user.steamID = steamId;
        await user.save();
        res.redirect('http://localhost:3000/auth/steam/return');
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'an unkown error occurred' });
        }
    }
};
export const getSteamGames = async (req, res) => {
    try {
        // const email = req.user.userEmail as {email: string};
        // const user = await User.findOne({ email: email });
        const cookies = await req.cookies;
        console.log('cookies', cookies);
        const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.REACT_APP_STEAM_API_KEY}&steamid=${process.env.REACT_APP_STEAM_ID}&format=json&include_appinfo=true`);
        const data = await response.json();
        // const games = data.response.games;
        // user.games = games;
        // await user.save();
        res.json(data);
        // console.log('Data from getStemGames', data.response.games);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'an unkown error occurred' });
        }
    }
};
