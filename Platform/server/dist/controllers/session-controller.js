import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
// TODO: Get the Steam ID from the sign-on with Steam
const getSteamGames = async (req, res) => {
    try {
        const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.REACT_APP_STEAM_API_KEY}&steamid=${process.env.REACT_APP_STEAM_ID}&format=json&include_appinfo=true`);
        const data = await response.json();
        res.json(data);
        console.log(data);
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
export default getSteamGames;
