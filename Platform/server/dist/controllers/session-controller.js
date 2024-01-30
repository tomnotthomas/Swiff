var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
// TODO: Get the Steam ID from the sign-on with Steam
const getSteamGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.REACT_APP_STEAM_API_KEY}&steamid=${process.env.REACT_APP_STEAM_ID}&format=json&include_appinfo=true`);
        const data = yield response.json();
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
});
export default getSteamGames;
