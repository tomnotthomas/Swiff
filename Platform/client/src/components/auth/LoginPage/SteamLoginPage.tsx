import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteamSquare } from '@fortawesome/free-brands-svg-icons';
import './SteamLoginPage.css'
import { Link } from 'react-router-dom';

function SteamLogin() {

  const handleAuth =(e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:3001/auth/steam';
  };

  return (
    <div id='backbox'>

      <div id='box'>
      <div id="info-steam-connect">
      <h2>Connect your Steam Account</h2>
      <p> Link your Steam account to access and play your Steam games on our platform.</p>
      </div>
        <div id='steambutton'>
          <button onClick={handleAuth} className="steambutton">
            <span>Connect Steam account</span>
            <div className="icon">
              <FontAwesomeIcon icon={faSteamSquare} className="fa fa-steam-square" />
	          </div>
          </button>
          <div id='login-create-account'>

            <p>Connect Steam account later?</p>
            <Link to='/'>Skip</Link>
          </div>
          </div>
        </div>
    </div>
  )
}

export default SteamLogin