import React, { useState } from 'react';
import './Dos.css'; 

const Dos = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = {
    cyclone: {
      dos: [
        'Stay indoors and away from windows.',
        'Have an emergency kit ready.',
        'Follow local weather updates.',
        'Secure outdoor objects and windows.'
      ],
      donts: [
        'Do not go outside during the cyclone.',
        'Avoid using electrical appliances.',
        'Do not drive unless absolutely necessary.',
        'Avoid using candles or open flames.'
      ]
    },
    floods: {
      dos: [
        'Move to higher ground immediately.',
        'Avoid walking or driving through floodwaters.',
        'Have an emergency kit with essentials.',
        'Follow evacuation orders.'
      ],
      donts: [
        'Do not drive through flooded roads.',
        'Avoid touching electrical equipment.',
        'Do not drink or use floodwater.',
        'Avoid walking in floodwater to prevent injury.'
      ]
    },
    earthquake: {
      dos: [
        'Drop to your hands and knees.',
        'Cover your head and neck.',
        'Hold on until the shaking stops.',
        'Stay indoors until it is safe.'
      ],
      donts: [
        'Do not run outside during shaking.',
        'Avoid using elevators.',
        'Do not stand near windows or heavy objects.',
        'Do not use matches or candles if you suspect a gas leak.'
      ]
    },
    volcanoes: {
      dos: [
        'Follow evacuation orders promptly.',
        'Protect yourself from ash fall.',
        'Stay indoors with windows and doors closed.',
        'Keep emergency supplies ready.'
      ],
      donts: [
        'Do not go outside unless necessary.',
        'Avoid driving through volcanic ash.',
        'Do not use masks not intended for ash.',
        'Avoid staying in low-lying areas prone to lava flows.'
      ]
    }
  };

  const handleTopicClick = (topic) => {
    if (selectedTopic === topic) {
      setSelectedTopic(null); // Hide the info if the same topic is clicked again
    } else {
      setSelectedTopic(topic); // Show the info for the new topic
    }
  };

  return (
    <div>
   <div style={{backgroundColor:'black'}} className="header"   ><h1 style={{marginLeft:"25rem", paddingTop:'50px', backgroundColor:'black'}}>We must be aware of Dos and Don'ts</h1></div>
    <div className="disaster-info">
      <div className="topics">
        {Object.keys(topics).map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            className="topic-button"
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </button>
        ))}
      </div>
      {selectedTopic && (
        <div className="info-box">
          <h2>Dos and Don'ts for {selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)}</h2>
          <div className="dos-donts">
            <div className="dos">
              <h3>Dos</h3>
              <ul>
                {topics[selectedTopic].dos.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="donts">
              <h3>Don'ts</h3>
              <ul>
                {topics[selectedTopic].donts.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div></div>
  );
};

export default Dos;