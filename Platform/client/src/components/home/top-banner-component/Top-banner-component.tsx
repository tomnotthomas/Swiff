import './top-banner-component.css'
import { useEffect, useState } from 'react';


function TopBanner({games}) {

//TODO change the look. Add the logo of the game, delete the stripes. add play or buy
  const[topTrailer, setTopTrailer] = useState([])

  useEffect(() =>{
    if(games.results) {
      const gameId= games.results[0].id
    fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${process.env.REACT_APP_RAWG_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTopTrailer(data))
      .catch((err) =>{
        console.log(err.message)
      });
    }
  }, [games]);

  return (
    <div id='container'>
      <video loop id='top-banner'
        src={ topTrailer.results && topTrailer.results[0].data.max}
        autoPlay
        muted
      />
    </div>
  )
}

export default TopBanner;