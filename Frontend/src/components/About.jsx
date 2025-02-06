import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Disaster Alert System</h1>
        
        <section className="about-section">
          <h2>Our Purpose</h2>
          <p>
            The Disaster Alert System is a comprehensive platform designed to provide 
            real-time alerts and critical information about natural disasters across India. 
            Our system aggregates data from multiple authoritative sources to ensure 
            citizens and authorities have access to timely and accurate disaster-related information.
          </p>
        </section>

        <section className="about-section">
          <h2>Disaster Categories We Monitor</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Meteorological</h3>
              <ul>
                <li>Cyclones</li>
                <li>Floods</li>
                <li>Droughts</li>
                <li>Heatwaves</li>
                <li>Thunderstorms</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>Geological</h3>
              <ul>
                <li>Earthquakes</li>
                <li>Landslides</li>
                <li>Tsunamis</li>
                <li>Volcanic Activity</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>Hydrological</h3>
              <ul>
                <li>Flash Floods</li>
                <li>Urban Flooding</li>
                <li>Coastal Hazards</li>
                <li>Storm Surges</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>Climatological</h3>
              <ul>
                <li>Forest Fires</li>
                <li>Extreme Temperatures</li>
                <li>Cold Waves</li>
                <li>Drought</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Data Sources</h2>
          <div className="source-list">
            <div className="source-item">
              <h3>IMD (India Meteorological Department)</h3>
              <p>Weather forecasts, cyclone warnings, and rainfall alerts</p>
            </div>
            <div className="source-item">
              <h3>NDMA (National Disaster Management Authority)</h3>
              <p>National-level disaster coordination and management</p>
            </div>
            <div className="source-item">
              <h3>CWC (Central Water Commission)</h3>
              <p>Flood forecasting and river water levels</p>
            </div>
            <div className="source-item">
              <h3>GSI (Geological Survey of India)</h3>
              <p>Landslide and earthquake monitoring</p>
            </div>
            <div className="source-item">
              <h3>INCOIS (Indian National Centre for Ocean Information Services)</h3>
              <p>Tsunami warnings and ocean state forecasts</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Alert Severity Levels</h2>
          <div className="severity-grid">
            <div className="severity-card red">
              <h3>Severe</h3>
              <p>Immediate action required. High risk to life and property.</p>
            </div>
            <div className="severity-card orange">
              <h3>Moderate</h3>
              <p>Be prepared. Significant risk to life and property.</p>
            </div>
            <div className="severity-card yellow">
              <h3>Minor</h3>
              <p>Be aware. Potential risk to life and property.</p>
            </div>
            <div className="severity-card green">
              <h3>Informational</h3>
              <p>General updates and information. No immediate risk.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>How to Use Our System</h2>
          <div className="usage-steps">
            <div className="step">
              <h3>1. Monitor Alerts</h3>
              <p>Check the homepage regularly for active alerts in your region</p>
            </div>
            <div className="step">
              <h3>2. Understand Severity</h3>
              <p>Pay attention to the color-coded severity levels of alerts</p>
            </div>
            <div className="step">
              <h3>3. Follow Guidelines</h3>
              <p>Read and follow the Do's and Don'ts for each type of disaster</p>
            </div>
            <div className="step">
              <h3>4. Stay Informed</h3>
              <p>Keep track of updates and changes in alert status</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Emergency Preparedness</h2>
          <p>
            Being prepared for disasters is crucial. We recommend:
          </p>
          <ul className="preparedness-list">
            <li>Creating a family emergency plan</li>
            <li>Keeping emergency contact numbers handy</li>
            <li>Maintaining an emergency kit</li>
            <li>Knowing evacuation routes</li>
            <li>Following official instructions during emergencies</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About; 