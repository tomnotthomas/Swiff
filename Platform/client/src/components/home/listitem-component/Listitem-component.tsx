import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './listitem-component.css';
import { GiGamepad } from "react-icons/gi";

function ListItem({ game }) {
  return (
    <div id='box-container'>
      <div id='info-box'>
        <LazyLoadImage
          className='small-image-info'
          src={game.background_image}
          alt={game.name} 
          effect="blur" 
        />
        <h2>{game.name}</h2>
        <div id='info-details'>
          <p>Released on {game.released}</p>
          <p>Rating {game.rating}</p>
        </div>
        <div id='play-rating'>
          <GiGamepad id='gamepad-icon' />
        </div>
      </div>
      <LazyLoadImage
        className='small-image'
        src={game.background_image}
        alt={game.name} // use game.name for alt text
        effect="blur" // Optional effect
      />
    </div>
  )
}

export default ListItem;