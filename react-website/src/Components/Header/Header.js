import React from 'react'
import './Header.css'
import headerImg from '../../Media/controller.png'

function Header() {
  return (
    <div className= 'top-screen'>
        <h1 className='top-screen-headline'>PLAY HIGH-END GAMES FROM YOUR MAC </h1>
      <img className= 'image-header' src={headerImg} alt='Game controller' />
   
    </div>
  )
}

export default Header