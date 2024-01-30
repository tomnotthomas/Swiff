import React from 'react';
import './Footer.css';
import logo from  '../../Media/logo_for_gaming.png'
function Footer() {
  return (
    <div className='footer'>
      <div className='column'>
        <h3>Legal</h3>
        <p className='column-item'>Terms and conditions</p>
        <p className='column-item'>Privacy Policy</p>
        <p className='column-item'>Cookie Policy</p>
      </div>
      <div className='logo-container'>
        <img className='logo-footer' src={logo} alt='GoodSpeed-logo'></img>
        <h1 id='swiff-footer'>Swiff!</h1>

      </div>
    </div>
  )
}

export default Footer