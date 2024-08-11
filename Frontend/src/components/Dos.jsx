import React, { useState } from 'react';
import './Dos.css';

const Dos = () => {
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  const disasterData = {
    earthquake: {
      title: 'Earthquake',
      dos: [
        'Drop, Cover, and Hold On.',
        'Stay indoors until the shaking stops.',
        'Move away from buildings, streetlights, and utility wires.'
      ],
      donts: [
        'Don’t run outside during the shaking.',
        'Don’t use elevators.',
        'Don’t stand under doorways.'
      ]
    },
    flood: {
      title: 'Flood',
      dos: [
        'Move to higher ground immediately.',
        'Turn off utilities at the main switches.',
        'Boil water before drinking it.'
      ],
      donts: [
        'Don’t walk through flowing water.',
        'Don’t drive through flooded areas.',
        'Don’t touch electrical equipment if you are wet.'
      ]
    },
    Volcano:{
      title:'Volcano',
      dos:['If authorities issue an evacuation order, follow it immediately to ensure your safety',
        'Stay indoors',
        'Use a mask'],
        donts:['Don’t ignore warnings','Don’t use electrical appliances','Don’t drink contaminated water']
    },
    cyclone: {
      title: 'Cyclone',
      dos: [
        'Secure your home and outdoor objects.',
        'Stay indoors and keep windows closed.',
        'Have an emergency kit ready.'
      ],
      donts: [
        'Don’t go outside during the storm.',
        'Don’t ignore official warnings.',
        'Don’t use candles during power outages.'
      ]
    }
  };

  const handleClick = (disaster) => {
    setSelectedDisaster(disaster);
  };

  return (
    <div className="guidelines-container">
      <h1>Disaster Guidelines</h1>
      <div className="disaster-buttons">
        {Object.keys(disasterData).map((key) => (
          <button
            key={key}
            onClick={() => handleClick(disasterData[key])}
            className="disaster-button"
          >
            {disasterData[key].title}
          </button>
        ))}
      </div>

      {selectedDisaster && (
        <div className="guidelines-content">
          <h2>{selectedDisaster.title} - Dos</h2>
          <ul className="guidelines-list">
            {selectedDisaster.dos.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h2>{selectedDisaster.title} - Don'ts</h2>
          <ul className="guidelines-list">
            {selectedDisaster.donts.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
       <div className="disaster-info">
        <h3>Why is it important to know Dos and Don'ts?</h3>
        <p>
          Understanding the correct actions to take during a disaster can significantly increase your chances of staying safe. 
          By knowing what to do and what to avoid, you can minimize risks to yourself and others, and respond more effectively 
          in emergency situations.
        </p>
      </div>
    </div>
  );
};

export default Dos;