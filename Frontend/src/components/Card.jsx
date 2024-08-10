import React from 'react'
import './Card.css'

const Card = () => {
  return (
    <div>
      <div className='disaser-ready'>DisasterReady</div>
      <div className='card'>
        <p>Stay informed, stay safe.</p>
        <p>Discover essential disaster podcasts.</p>
        <img src={alert} alt="Disaster Alert" />
        <p>Listen to disaster preparedness podcasts on-the-go.</p>
      </div>
    </div>
  )
}

export default Card
