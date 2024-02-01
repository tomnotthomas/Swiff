import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './components/home/HomePage/HomePage.tsx';
import SteamLogin from './components/auth/LoginPage/SteamLoginPage.tsx';
import Login from './components/auth/LoginPage/LoginPage.tsx';
import RegistrationPage from './components/auth/RegistrationPage/RegistrationPage.tsx';
import {useState, useEffect} from 'react';
import ProtectedRoutes from './components/auth/ProtectedRoutes.tsx';



function App() {
  const [games, setGames] = useState([]);
  const [steamGames, setSteamGames] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")


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
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home games={games} steamGames={steamGames}/> } path="/" exact/>
        </Route>

        <Route path="/auth/steam/return" element={<Navigate to="/" replace={true} />} />
        <Route path="/login" element={ <Login/> } />
        <Route path="/steam-login" element={ <SteamLogin/> } />
        <Route path="/register" element={ <RegistrationPage/> } />
      </Routes>
    </div>
  )


}

export default App;
