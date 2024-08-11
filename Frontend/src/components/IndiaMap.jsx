import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './IndiaMap.css'; // Create a new CSS file for map styling

// Custom icon for the markers
const disasterIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const IndiaMap = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch disaster alerts from the backend
    fetch('http://localhost:3000/api/disaster-alerts')
      .then(response => response.json())
      .then(data => setAlerts(data))
      .catch(error => console.error('Error fetching disaster alerts:', error));
  }, []);

  return (
    <div className="map-container">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {alerts.map((alert, index) => (
          <Marker
            key={index}
            position={[alert.latitude, alert.longitude]}
            icon={disasterIcon}
          >
            <Popup>
              <strong>{alert.alert}</strong><br />
              {alert.location}<br />
              Latitude: {alert.latitude}, Longitude: {alert.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IndiaMap;
