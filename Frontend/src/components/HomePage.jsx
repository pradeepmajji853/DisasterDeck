import React from 'react';
import './Homepage.css';

const HomePage = () => {
  return (
    <div className="container">
      <div className="button-container">
        <button className="alert-button">Current Location CAP Alert</button>
        <button className="alert-button">All India CAP Alert</button>
      </div>
      <div className="content">
        <div className="map-container">

          <img src="path_to_your_map_image" alt="Map" className="map-image" />
        </div>
        <div className="alert-list">
          <div className="alert-item">Lightning - 14 Mandals</div>
          <div className="alert-item">Lightning - PADMANABHAM, JAMI, KOMARADA mandals</div>
         
        </div>
        <div className="weather-card">
          <div className="weather-header">
            <h2>Hyderabad</h2>
            <p>Partly Cloudy</p>
            <h3>31.6°C</h3>
          </div>
          <div className="weather-forecast">
            <h4>Hourly Forecast</h4>
            <p>5:00 PM - 29.1°C</p>
            <p>6:00 PM - 27.4°C</p>
            <p>7:00 PM - 26.5°C</p>
          </div>
          <div className="daily-forecast">
            <h4>Daily Forecast</h4>
            <p>Today - 32°C High / 23°C Low</p>
            <p>Sunday - 32°C High / 24°C Low</p>
            <p>Monday - 33°C High / 23°C Low</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

