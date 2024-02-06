import './HomePage.css';
import Header from '../../common/header/Header.tsx';
import List from '../list-component/List-component.tsx';
import TopBanner from '../top-banner-component/Top-banner-component.tsx';
import Cookies from 'universal-cookie';
import {useState, useEffect} from 'react';

const cookies = new Cookies();

function Home({ setLoggedSteam, loggedSteam }) {

  const [steamGames, setSteamGames] = useState([]);
  const [gamesRow1, setGamesRow1] = useState([]);
  const [gamesRow2, setGamesRow2] = useState([]);
  const [gamesRow3, setGamesRow3] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    if (searchQuery.length > 2) {
      searchRAWGGames(searchQuery);
      setSearching(true);
    }
  };

  const handleReset = () => {
    setSearching(false);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Fetch games from RAWG API
  const getRAWGGames = async (genre: string) => {
    try {
      const apiUrl = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&genres=${genre}&platforms=4`;
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

  const searchRAWGGames = async (query: string) => {
    try {
      const apiUrl = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&search=${query}&platforms=4`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`${query} not found`);
      }
      const data = await response.json();
      console.log(`${query} loaded:`, { data });
      setSearchResults(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Fetch games from RAWG API
  useEffect(() => {
    const fetchData = async () => {
      const action = await getRAWGGames('action');
      const sports = await getRAWGGames('sports');
      const strategy = await getRAWGGames('strategy');
      setGamesRow1(action);
      setGamesRow2(sports);
      setGamesRow3(strategy);
      // const adventure = await getRAWGGames('adventure');
      // const rpg = await getRAWGGames('role-playing-games-rpg');
      // const shooter = await getRAWGGames('shooter');
      // const casual = await getRAWGGames('casual');
      // const puzzle = await getRAWGGames('puzzle');
      // const racing = await getRAWGGames('racing');
      // const fighting = await getRAWGGames('fighting');
      // const adventure = await getRAWGGames('adventure');
      // const simulation = await getRAWGGames('simulation');
      // const indie = await getRAWGGames('indie');
      // const platformer = await getRAWGGames('platformer');
      // const horror = await getRAWGGames('horror');
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
           return { ...rawgData };
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
    <Header loggedSteam={loggedSteam}/>
    <TopBanner games={gamesRow1}/>
    <h1> My Steam Games</h1>
    <List games ={steamGames}/>
    <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for games..."
    />
    <button onClick={handleSearch}>Go!</button>
    { searching ? (
      <div>
        <button onClick={handleReset}>Back home</button>
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
