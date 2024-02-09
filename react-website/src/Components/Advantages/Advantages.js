import React from 'react'
import './Advantages.css'
import baldursGate from '../../Media/Baldurs_gate.png'
import playNow from '../../Media/playnow.png'
function Advantages() {
  return (

      <div className='advantages'>
        <div className='advantages-left'>
          <img className='image' src={playNow} alt='baldurs gate'></img>
        </div>
        <div className='advantages-right'>
          <div className='info-box'>
            <h3 className='text-box'>Expansive Game Library:</h3>
            <p className='text-box'> Access a wide range of top-tier games on your Mac, bypassing hardware limitations.</p>
          </div>
          <div className='info-box'>
            <h3 className='text-box'>Instant Play:</h3>
            <p className='text-box'> Jump straight into games with no downloads or updates, saving time and space.</p>
          </div>
          <div className='info-box'>
            <h3 className='text-box'>Effortless and Elegant:</h3>
            <p className='text-box'>Enjoy a gaming experience that matches the Mac's simplicity and efficiency.</p>
          </div>
          
        </div>
      </div>
    
  )
}

export default Advantages