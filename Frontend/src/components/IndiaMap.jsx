import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './IndiaMap.css';

// Custom icon for alerts
const alertIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Component to handle map center changes
const ChangeMapView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const IndiaMap = ({ latitude, longitude, alerts, showAllAlerts }) => {
  // Default center of India
  const defaultCenter = [20.5937, 78.9629];
  const center = latitude && longitude ? [latitude, longitude] : defaultCenter;
  const zoom = latitude && longitude && !showAllAlerts ? 10 : 5;

  return (
    <div className="map-wrapper">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        className="map-container"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* User location marker */}
        {latitude && longitude && (
          <Marker position={[latitude, longitude]} icon={userIcon}>
            <Popup>
              <div className="popup-content">
                <h3>Your Location</h3>
                <p>Lat: {latitude.toFixed(4)}</p>
                <p>Long: {longitude.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Alert markers */}
        {alerts.map((alert, index) => {
          // Handle different alert data structures
          const position = alert.coordinates 
            ? [alert.coordinates[1], alert.coordinates[0]] 
            : alert.latitude && alert.longitude 
              ? [alert.latitude, alert.longitude]
              : null;

          if (!position) return null;

          return (
            <Marker
              key={index}
              position={position}
              icon={alertIcon}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{alert.event}</h3>
                  <p>{alert.description}</p>
                  {alert.date && <p>Date: {alert.date}</p>}
                </div>
              </Popup>
            </Marker>
          );
        })}

        <ChangeMapView center={center} />
      </MapContainer>
    </div>
  );
};

export default IndiaMap;
