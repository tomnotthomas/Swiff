import React from 'react';
import { useAppContext } from '../../AppContext.tsx'; // Import the context hook
import './vmstatus-component.css';
import { FaRegCircleStop } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



function Vmstatus() {
  const navigate = useNavigate();

  const { isActive, setIsActive } = useAppContext(); // Access the shared context

  const handleToggleActive = () => {
    setIsActive(!isActive); // Update isActive state without re-rendering the whole app
  };

  const stopVm = () => {
    fetch('http://localhost:3001/stopvm', {
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
          setIsActive(false); // Set isActive to false when VM is stopped
          handleToggleActive();
          navigate('/')
        }
      }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  // Render the component
  return (
    <div id='button-placer-end-game'>
      <div className='notification-vm-special' onClick={stopVm}>
        <h3 id='endgame' >End Game Session</h3>
        <FaRegCircleStop id='stop-button' />
      </div>
    </div>

  );
}

export default Vmstatus;