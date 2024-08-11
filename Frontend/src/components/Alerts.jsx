import React, { useState, useEffect } from 'react';
import './Alerts.css';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch disaster alerts from the backend
    fetch('http://localhost:3000/api/disaster-alerts')
      .then(response => response.json())
      .then(data => setAlerts(data))
      .catch(error => console.error('Error fetching disaster alerts:', error));
  }, []);

  // Function to determine the CSS class based on the alert type
  const getAlertClass = (type) => {
    switch (type.toLowerCase()) {
      case 'lightning':
        return 'alert-item-lightning';
      case 'light rain':
        return 'alert-item-lightrain';
      case 'gusty winds':
        return 'alert-item-gustywinds';
      case 'thunderstorm':
        return 'alert-item-thunderstorm';
      case 'heavy rain':
        return 'alert-item-heavyrain';
      default:
        return 'alert-item-default';
    }
  };

  return (
    <div className="alerts-container">
      <h1>Disaster Alerts</h1>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} className={getAlertClass(alert.alert)}>
            <strong>{alert.alert}</strong> - {alert.location}
            <br />
            <small>Latitude: {alert.latitude}, Longitude: {alert.longitude}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
