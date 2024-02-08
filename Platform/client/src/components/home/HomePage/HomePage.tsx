import './HomePage.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';

import Header from '../../common/header/Header.tsx';
import List from '../list-component/List-component.tsx';
import TopBanner from '../top-banner-component/Top-banner-component.tsx';


const cookies = new Cookies();

function Home({ setLoggedSteam, loggedSteam }) {

  const [steamGames, setSteamGames] = useState([]);
  const [gamesRow1, setGamesRow1] = useState([]);
  const [gamesRow2, setGamesRow2] = useState([]);
  const [gamesRow3, setGamesRow3] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  // Fetch games from RAWG API
  const getRAWGGames = async (genre: string) => {
    try {
      const apiUrl = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&genres=${genre}&platforms=4&stores=1`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${genre} games from RAWG API`);
      }
      const data = await response.json();
      console.log(`${genre} games from RAWG API loaded:`, { data });
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };


  // Fetch games from RAWG API
  useEffect(() => {
    const fetchData = async () => {
      const action = await getRAWGGames('action');
      const sports = await getRAWGGames('sports');
      const strategy = await getRAWGGames('strategy');
      setGamesRow1(action);
      setGamesRow2(sports);
      setGamesRow3(strategy);
    };
    fetchData();
  }, []);


 // Fetch games list from Steam API
  useEffect(() => {
    fetch('http://localhost:3001/steamgames', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userEmail: cookies.get("USER_DATA")?.email
    }),
      // credentials: 'include',  // to include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Steam games loaded:', data);
        // Transform game names to slug form
        const slugNameSteamGames = data.response.games.map(game => {
          return { ...game, slug: game.name.toLowerCase().split(' ').join('-') };
      });

        // Fetch additional game details from RAWG API for each game
        Promise.all(slugNameSteamGames.map(game =>
          fetch(`https://api.rawg.io/api/games/${game.slug}?key=${process.env.REACT_APP_RAWG_API_KEY}`)
          .then(res => res.json())
          .then(rawgData => {
            return { ...game, ...rawgData };
          })
          )).then(results => {
            setLoggedSteam(true);
            setSteamGames({results});
            console.log('User-owned Steam games loaded:', {results})
        });
      })
      .catch((err) => {
        console.log('Steam fetch games API error:', err.message);
      });
  }, []);



 return (
  <div>
    <Header
      setLoggedSteam={setLoggedSteam}
      loggedSteam={loggedSteam}
      searching={searching}
      setSearching={setSearching}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      setSearchResults={setSearchResults}

    />
    <TopBanner games={gamesRow1}/>
    <h1> My Steam Games</h1>
    <List games ={steamGames}/>
     { searching ? (
        <div>
          <h1>Search Results</h1>
          <List games={searchResults}/>
      </div>
    ) : (
      <>
        <h1>Action</h1>
        <List games ={gamesRow1}/>
        <h1>Sports</h1>
        <List games ={gamesRow2}/>
        <h1>Strategy</h1>
        <List games ={gamesRow3}/>
      </>
    )}
  </div>
);
}

export default Home;
