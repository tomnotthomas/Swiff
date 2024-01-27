require('dotenv').config();

//TODO get the Steam ID from the sign on with Steam
exports.getSteamGames = async function (req, res) {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.REACT_APP_STEAM_API_KEY}&steamid=${process.env.REACT_APP_STEAM_ID}&format=json&include_appinfo=true`);
    const data = await response.json();
    res.json(data);
    console.log(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};