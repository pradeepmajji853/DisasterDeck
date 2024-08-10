import React from 'react';
import MapWithShelters from './MapWithShelters'; // Ensure the import path is correct
import EmergencyContact from './EmergencyContact'; // Ensure the import path is correct
import "./Emergency.css";

function Emergency() {
  return (
    <div className='Emergency'>
      <div className="shelter">
        <h1>Relief Centers Near You</h1>
        <div className="map-container">
          <MapWithShelters />
        </div>
      </div>
      <div className="contact">
        <EmergencyContact />
      </div>
    </div>
  );
}

export default Emergency;
