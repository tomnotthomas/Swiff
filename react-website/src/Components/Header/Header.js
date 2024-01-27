import React from 'react'
import './Header.css'
import headerImg from '../../Media/controller.png'

function Header() {
  return (
    <div className= 'top-screen'>
      <img className='image' src={headerImg} alt='Game controller' />
   
    </div>
  )
}

export default Header