import React from 'react';
import './Alerts.css';
import { alertsData } from '../data/alertsData';

const Alerts = () => {
  return (
    <div className="alerts-container">
      <h1>Disaster Alerts</h1>
      <ul>
        {alertsData.map((alert) => (
          <li key={alert.id} className={`alert-item-${alert.alert.toLowerCase().replace(' ', '')}`}>
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
