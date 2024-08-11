import React, { useState } from 'react';
import "./PreparednessChecklist.css"

const PreparednessChecklist = () => {
  const disasters = {
    Earthquake: ['Emergency Contact number', 'Evacuation Routes'],
    Flood: ['Sandbags', 'Medication Supply'],
    Fire: ['Smoke Alarms', 'Fire Extinguisher'],
    Cyclone: ['Property protection', 'Electricity Shut-Off'], // Fixed extra comma
    Volcano: ['Disaster kit', 'Mental Health Preparedness'],
    Human_Disasters: ['Plan for Pets', 'Emergency Contact number']
  };

  const [completedItems, setCompletedItems] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (disaster, item) => {
    setCompletedItems((prev) => ({
      ...prev,
      [disaster]: {
        ...prev[disaster],
        [item]: !prev[disaster]?.[item],
      },
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateProgress = (disaster) => {
    const checklist = disasters[disaster];
    const completedCount = checklist.filter((item) => completedItems[disaster]?.[item]).length;
    return (completedCount / checklist.length) * 100;
  };

  return (
    <div className="app-container">
      {!submitted ? (
        <div className={`form-container ${submitted ? 'slide-out' : ''}`}>
          <div className="checks">
            <h1 className="heading">Disaster Preparedness Checklist</h1>
            {Object.keys(disasters).map((disaster) => (
              <div key={disaster} className="disaster-section">
                <ul className="checklist">
                  {disasters[disaster].map((item, index) => (
                    <li key={index} className="list-item">
                      <label className="label">
                        <input
                          type="checkbox"
                          checked={completedItems[disaster]?.[item] || false}
                          onChange={() => handleCheckboxChange(disaster, item)}
                          className="checkbox"
                        />
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
      ) : (
        <div className='Finalresult'>
          <div className="results-container">
            <h1 className="heading">Preparedness Results</h1>
            {Object.keys(disasters).map((disaster) => (
              <div key={disaster} className="progress-section">
                <h2 className="disaster-name">{disaster}</h2>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${calculateProgress(disaster)}%` }}>
                    {Math.round(calculateProgress(disaster))}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreparednessChecklist;

