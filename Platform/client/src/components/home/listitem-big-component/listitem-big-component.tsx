import './listitem-big-component.css'
import { GiGamepad } from "react-icons/gi";



function ListItemBig({game}) {
  return (
    <div id='box-container-big'>
      <div id='info-box-big'>
        <img className='small-image-info-big' src= {game.background_image} alt='gta'></img>
        <div id='info-details-big'>
          <h2>{game.name}</h2>
          <p>Released on {game.released}</p>
          <p>Rating {game.rating}</p>
          <GiGamepad id='gamepad-icon' />

        </div>
      </div>
      <img className='small-image-big' src= {game.background_image} alt='gta'></img>
    </div>
  )
}

export default ListItemBig