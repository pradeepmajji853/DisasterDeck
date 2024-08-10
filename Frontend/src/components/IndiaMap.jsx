import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const IndiaMap = ({ latitude, longitude }) => {
  // Set default position in case latitude or longitude is null
  const position = [latitude || 20.5937, longitude || 78.9629]; 

  return (
    <MapContainer center={position} zoom={5} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          {latitude && longitude ? 'Your Location' : 'Default Location'}<br />
          Latitude: {position[0]}<br />
          Longitude: {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default IndiaMap;