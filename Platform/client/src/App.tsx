import './App.css';
import List from './components/list-component/List-component.tsx';
import TopBanner from './components/top-banner-component/Top-banner-component.tsx';
import {useState, useEffect, createContext} from 'react';

export const Context = createContext();

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
      <div>
        <TopBanner games={games}/>
        <h1> My Steam Games</h1>
        <List games ={steamGames}/>
        <h1>Games to buy</h1>
        <List games ={games}/>
      </div>
  );
}

export default App;
