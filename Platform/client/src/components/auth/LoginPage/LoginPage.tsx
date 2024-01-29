import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteamSquare } from '@fortawesome/free-brands-svg-icons';
import './LoginPage.css'


function Login() {

  const handleAuth =() => {
    window.location.href = 'http://localhost:3000/auth/steam';
  };


  return (
    <div id='backbox'>

      <div id='box'>
      <h2>Login</h2>
        <div id='steambutton'>
          <button onClick={handleAuth} className="steambutton">
            <span>Login With Steam</span>
            <div className="icon">
              <FontAwesomeIcon icon={faSteamSquare} className="fa fa-steam-square" />
	          </div>
          </button>
          <div id='login-create-account'>

            <p>New to Gamix?</p>
            <a href='example.com'>create an account</a>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Login