import React, { useState } from 'react';
import './Dos.css';

const Dos = () => {
  const [selectedDisaster, setSelectedDisaster] = useState('flood');

  const disasterGuidelines = {
    flood: {
      title: "Floods",
      dos: [
        "Move to higher ground immediately",
        "Listen to official instructions",
        "Keep emergency kit ready",
        "Turn off utilities at main switches",
        "Disconnect electrical appliances",
        "Fill clean containers with drinking water"
      ],
      donts: [
        "Don't walk through flowing water",
        "Don't drive through flooded areas",
        "Don't touch electrical equipment if wet",
        "Don't ignore evacuation orders",
        "Don't use contaminated water",
        "Don't return home until authorities declare it safe"
      ]
    },
    cyclone: {
      title: "Cyclones",
      dos: [
        "Keep emergency kit ready",
        "Secure important documents in waterproof container",
        "Follow weather updates regularly",
        "Keep mobile phones charged",
        "Store drinking water and non-perishable food",
        "Know evacuation routes and emergency contacts"
      ],
      donts: [
        "Don't venture out during cyclone",
        "Don't spread or believe rumors",
        "Don't leave shelter until all-clear signal",
        "Don't go near damaged power lines",
        "Don't use electrical equipment if wet",
        "Don't ignore official warnings"
      ]
    },
    earthquake: {
      title: "Earthquakes",
      dos: [
        "Drop, Cover, and Hold On",
        "Stay away from windows and exterior walls",
        "If in bed, stay there and protect head",
        "Keep emergency kit accessible",
        "Know safe spots in each room",
        "Have a family emergency plan"
      ],
      donts: [
        "Don't run outside during shaking",
        "Don't use elevators",
        "Don't light matches or flames",
        "Don't stand in doorways",
        "Don't panic and rush",
        "Don't use phones except for emergencies"
      ]
    },
    // Add more disasters as needed
  };

  return (
    <div className="dos-container">
      <h1>Disaster Safety Guidelines</h1>
      
      <div className="disaster-selector">
        <select 
          value={selectedDisaster}
          onChange={(e) => setSelectedDisaster(e.target.value)}
        >
          <option value="flood">Floods</option>
          <option value="cyclone">Cyclones</option>
          <option value="earthquake">Earthquakes</option>
          <option value="heatwave">Heat Waves</option>
          <option value="landslide">Landslides</option>
          <option value="tsunami">Tsunamis</option>
        </select>
      </div>

      <div className="guidelines-container">
        <div className="dos-section">
          <h2>Do's</h2>
          <ul>
            {disasterGuidelines[selectedDisaster].dos.map((item, index) => (
              <li key={`do-${index}`}>
                <span className="checkmark">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="donts-section">
          <h2>Don'ts</h2>
          <ul>
            {disasterGuidelines[selectedDisaster].donts.map((item, index) => (
              <li key={`dont-${index}`}>
                <span className="cross">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="emergency-contacts">
        <h2>Emergency Contacts</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>National Emergency Number</h3>
            <p>112</p>
          </div>
          <div className="contact-item">
            <h3>Police</h3>
            <p>100</p>
          </div>
          <div className="contact-item">
            <h3>Fire</h3>
            <p>101</p>
          </div>
          <div className="contact-item">
            <h3>Ambulance</h3>
            <p>102</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dos;