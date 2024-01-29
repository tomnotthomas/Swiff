import './listitem-component.css'
import { GiGamepad } from "react-icons/gi";



function ListItem({game}) {
  return (
    <div id='box-container'>
      <div id='info-box'>
        <img className='small-image-info' src= {game.background_image} alt='gta'></img>
        <h2>{game.name}</h2>
        <div id='info-details'>
          <p>Released on {game.released}</p>
          <p>Rating {game.rating}</p>

        </div>
        <div id='play-rating'>
          <GiGamepad id='gamepad-icon' />
        </div>
      </div>
      <img className='small-image' src= {game.background_image} alt='gta'></img>
    </div>
  )
}

export default ListItem