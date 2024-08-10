import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Alerts.css';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/disaster-alerts');
        setAlerts(response.data);
      } catch (err) {
        setError('Failed to fetch disaster alerts');
      }
      setLoading(false);
    };

    fetchAlerts();
  }, []);

  return (
    <div className="container">
      <h1>Disaster Alerts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="alerts">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => <div key={index} className="alert-item">{alert}</div>)
        ) : (
          <p>No alerts available</p>
        )}
      </div>
    </div>
  );
};

export default Alerts;
