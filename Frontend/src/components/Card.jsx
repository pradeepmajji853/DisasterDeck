import React from 'react'
import alert from '/alert.jpg'
import './card.css'
const Card = () => {
  return (
    <div>
      <div className='disaser-ready'>DisasterReady</div>
      <div className='card'>
        <p>Stay informed,stay safe.</p>
        <p>Discover essential disaster podcasts.</p>
        <img src={alert}></img>
        <p>Listen to disaster preparedness podcasts on-the-go.</p>


      </div>
    </div>
  )
}

export default Card
