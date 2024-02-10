# 🚀 Getting Started with Swiff Frontend

Welcome to the setup guide for Swiff, your go-to app for gaming platform for Mac. Follow these steps to get your frontend up and running smoothly.

## Initial Setup

### Step 1: Acquire API Keys 🔑

#### RAWG API Key
To display game data, first get your RAWG API key: [RAWG API Documentation](https://rawg.io/apidocs)

#### Steam Web API Key
Get your Steam Web API key here: [Steam Web API Key](https://steamcommunity.com/dev/apikey)  
*Note: You need at least one paid game in your Steam account to request a Steam Web API key.

### Step 2: Steam Game Account 🎮
If you don't already have a Steam account, set one up to test the complete workflow: [Create Steam Account](https://store.steampowered.com/join/)  
*Tip: Add some games to your new account, or use your existing Steam account for authentication within the app.

## Installation and Setup

To install the required dependencies, run `npm install` from the client, server, and react-website folders.

Create a `.env` file in the client folder and add the following variables:
- `REACT_APP_RAWG_API_KEY` - Your RAWG API Key.
- `REACT_APP_STEAM_API_KEY` - Your Steam Web API Key.

Run `npm start` from the client folder to start the client. The project will now be running at [http://localhost:3000](http://localhost:3000).  
The page will reload when you make changes.

`npm run build` builds the app for production to the build folder.  
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include the hashes.

## Tech Stack

- **Front-end**: React
- **Tokens**: JWT
- **API**: Steam, RAWG
