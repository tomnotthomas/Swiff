import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Media/logo_for_gaming.png'

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to ='/' className='navbar-logo'>
            <img className='logo' src={logo} alt='GoodSpeed-logo'></img>
            <h1 id='swiff'>Swiff!</h1>
          </Link>
          <button className='register-button'>Register now!</button>
        </div>

      </nav>
      </>
  )
}

export default Navbar