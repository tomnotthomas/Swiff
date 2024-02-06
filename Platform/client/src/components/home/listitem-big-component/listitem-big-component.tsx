import React from 'react';
import './listitem-big-component.css';
import { GiGamepad } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../AppContext.tsx'; // Import the context hook
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function ListItemBig({ game }) {
  const navigate = useNavigate();
  const { setIsActive } = useAppContext(); // Access the shared context

  const startVm = () => {
    fetch('http://localhost:3001/startvm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: cookies.get('USER_DATA')?.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsActive(true); // Set isActive to true when VM is started
          navigate('/vmstatus');
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div id='box-container-big'>
      <div id='info-box-big'>
        <img className='small-image-info-big' src={game.background_image} alt='gta'></img>
        <div id='info-details-big'>
          <h2>{game.name}</h2>
          <p>Released on {game.released}</p>
          <p>Rating {game.rating}</p>
          <GiGamepad id='gamepad-icon' onClick={startVm} />
        </div>
      </div>
      <img className='small-image-big' src={game.background_image} alt='gta'></img>
    </div>
  );
}

export default ListItemBig;