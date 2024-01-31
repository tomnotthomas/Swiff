import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './components/home/HomePage/HomePage.tsx';
import Login from './components/auth/LoginPage/LoginPage.tsx';
import RegistrationPage from './components/auth/RegistrationPage/RegistrationPage.tsx';
import {useState, useEffect} from 'react';


function App() {
  const [games, setGames] = useState([]);
  const [steamGames, setSteamGames] = useState([]);

  useEffect(() => {
     fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
           console.log({data});
           setGames(data);
        })
        .catch((err) => {
           console.log(err.message);
        });
  }, []);

  useEffect(() => {
    console.log("steamGames updated:", steamGames);
  }, [steamGames]);

  useEffect(() => {
    fetch(`http://localhost:3001/steamgames`)
      .then((res) => res.json())
      .then((data) => {

        // Transform game names to slug form
        const slugNameSteamGames = data.response.games.map(game => {
          return { ...game, slug: game.name.toLowerCase().split(' ').join('-') };
        });

        // Fetch additional game details from RAWG API for each game
        Promise.all(slugNameSteamGames.map(game =>
          fetch(`https://api.rawg.io/api/games/${game.slug}?key=${process.env.REACT_APP_RAWG_API_KEY}`)
            .then(res => res.json())
            .then(rawgData => {
              return { ...rawgData };
            })
        )).then(results => {
          console.log({results})
          setSteamGames({results});
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  return (
    <div className="App">
      <Routes>
        <Route path="/auth/steam/return" element={ <Home games={games} steamGames={steamGames}/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <RegistrationPage/> } />
      </Routes>
    </div>
  )


}

export default App;
