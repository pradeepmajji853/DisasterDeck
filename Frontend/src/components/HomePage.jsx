import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import Weather from "./Weather.jsx";
import IndiaMap from "./IndiaMap.jsx";

const HomePage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("Hyderabad");
  const [locationError, setLocationError] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [permissionState, setPermissionState] = useState('prompt');

  // IMD API endpoints
  const IMD_BASE_URL = 'https://internal.imd.gov.in/imdapis';
  const INCOIS_BASE_URL = 'https://incois.gov.in/api';
  const NDMA_BASE_URL = 'https://ndma.gov.in/api';

  // Function to check permission status
  const checkPermissionStatus = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionState(permission.state);
      
      // Listen for permission changes
      permission.addEventListener('change', () => {
        setPermissionState(permission.state);
      });
    } catch (error) {
      console.error("Error checking permission:", error);
    }
  };

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  // Function to handle location permission
  const requestLocationPermission = async () => {
    try {
      setLoading(true);
      setLocationError(null);

      // Request permission explicitly
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      
      // After getting location, fetch alerts
      await fetchLocationAlerts(position.coords.latitude, position.coords.longitude);
      
    } catch (error) {
      console.error("Location error:", error);
      let errorMessage = "";
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Please enable location access in your browser settings. Here's how:\n" +
            "1. Click the lock/info icon in your browser's address bar\n" +
            "2. Find 'Location' or 'Site Settings'\n" +
            "3. Allow location access for this site\n" +
            "4. Refresh the page";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out. Please try again.";
          break;
        default:
          errorMessage = "An unknown error occurred getting your location.";
      }
      
      setLocationError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch location alerts
  const fetchLocationAlerts = async (lat, lon) => {
    try {
      setLoading(true);
      const apiKey = '4eb3703790b356562054106543b748b2';

      // Get current weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      // Get location name
      const locationResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
      );

      const locationName = locationResponse.data[0]?.name || 'your location';
      setCity(locationName);

      const weather = weatherResponse.data.weather[0];
      const temp = weatherResponse.data.main.temp;
      const humidity = weatherResponse.data.main.humidity;
      const windSpeed = weatherResponse.data.wind.speed;

      let localAlerts = [];

      // Check for various weather conditions
      if (temp > 40) {
        localAlerts.push({
          event: 'Extreme Heat Warning',
          description: `Temperature is ${temp.toFixed(1)}°C. Stay hydrated and avoid outdoor activities.`,
          severity: 'Severe',
          type: 'heat'
        });
      } else if (temp > 35) {
        localAlerts.push({
          event: 'Heat Alert',
          description: `Temperature is ${temp.toFixed(1)}°C. Take necessary precautions.`,
          severity: 'Moderate',
          type: 'heat'
        });
      }

      if (weather.main === 'Thunderstorm') {
        localAlerts.push({
          event: 'Thunderstorm Alert',
          description: `${weather.description}. Wind speed: ${windSpeed} m/s`,
          severity: 'Severe',
          type: 'storm'
        });
      }

      if (weather.main === 'Rain' && windSpeed > 10) {
        localAlerts.push({
          event: 'Heavy Rain Warning',
          description: `${weather.description} with strong winds at ${windSpeed} m/s`,
          severity: 'Moderate',
          type: 'rain'
        });
      }

      if (humidity > 85) {
        localAlerts.push({
          event: 'High Humidity Alert',
          description: `Current humidity is ${humidity}%. This may cause discomfort.`,
          severity: 'Moderate',
          type: 'humidity'
        });
      }

      // If no severe conditions, add current weather info
      if (localAlerts.length === 0) {
        localAlerts.push({
          event: `Current Weather in ${locationName}`,
          description: `${weather.description}. Temperature: ${temp.toFixed(1)}°C, Humidity: ${humidity}%, Wind: ${windSpeed} m/s`,
          severity: 'Normal',
          type: weather.main.toLowerCase()
        });
      }

      // Add coordinates to all alerts
      const alertsWithLocation = localAlerts.map(alert => ({
        ...alert,
        latitude: lat,
        longitude: lon,
        date: new Date().toLocaleDateString()
      }));

      setAlerts(alertsWithLocation);

    } catch (error) {
      console.error("Error fetching local alerts:", error);
      setAlerts([{
        event: "Error",
        description: "Unable to fetch weather alerts for your location. Please try again.",
        severity: "Normal",
        type: "error",
        latitude: lat,
        longitude: lon
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch IMD weather warnings
  const fetchIMDWarnings = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${YOUR_API_KEY}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.get(`${IMD_BASE_URL}/weather/warnings`, { headers });
      return response.data.map(warning => ({
        event: warning.type,
        description: warning.description,
        severity: warning.severity,
        type: 'weather',
        latitude: warning.latitude,
        longitude: warning.longitude,
        region: warning.state,
        date: new Date(warning.issueTime).toLocaleDateString()
      }));
    } catch (error) {
      console.error("Error fetching IMD warnings:", error);
      return [];
    }
  };

  // Function to fetch INCOIS ocean warnings
  const fetchINCOISWarnings = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${YOUR_API_KEY}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.get(`${INCOIS_BASE_URL}/coastal-warnings`, { headers });
      return response.data.map(warning => ({
        event: warning.type,
        description: warning.description,
        severity: warning.severity,
        type: 'ocean',
        latitude: warning.latitude,
        longitude: warning.longitude,
        region: warning.state,
        date: new Date(warning.issueTime).toLocaleDateString()
      }));
    } catch (error) {
      console.error("Error fetching INCOIS warnings:", error);
      return [];
    }
  };

  // Function to fetch NDMA alerts
  const fetchNDMAAlerts = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${YOUR_API_KEY}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.get(`${NDMA_BASE_URL}/alerts`, { headers });
      return response.data.map(alert => ({
        event: alert.type,
        description: alert.description,
        severity: alert.severity,
        type: 'disaster',
        latitude: alert.latitude,
        longitude: alert.longitude,
        region: alert.state,
        date: new Date(alert.issueTime).toLocaleDateString()
      }));
    } catch (error) {
      console.error("Error fetching NDMA alerts:", error);
      return [];
    }
  };

  // Function to fetch earthquake data from USGS (as a backup)
  const fetchUSGSEarthquakes = async () => {
    try {
      const response = await axios.get(
        'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' +
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() +
        '&minlatitude=8.4&maxlatitude=37.6&minlongitude=68.7&maxlongitude=97.25&minmagnitude=4.0'
      );

      return response.data.features
        .filter(quake => {
          const [lon, lat] = quake.geometry.coordinates;
          return lat >= 8.4 && lat <= 37.6 && lon >= 68.7 && lon <= 97.25;
        })
        .map(quake => ({
          event: `Earthquake M${quake.properties.mag}`,
          description: `Magnitude ${quake.properties.mag} earthquake detected near ${quake.properties.place}`,
          severity: quake.properties.mag >= 5 ? 'Severe' : 'Moderate',
          type: 'earthquake',
          latitude: quake.geometry.coordinates[1],
          longitude: quake.geometry.coordinates[0],
          date: new Date(quake.properties.time).toLocaleDateString()
        }));
    } catch (error) {
      console.error("Error fetching USGS data:", error);
      return [];
    }
  };

  // Function to fetch all India alerts
  const fetchAllIndiaAlerts = async () => {
    try {
      setLoading(true);
      setAlerts([]);

      // Fetch alerts from all sources in parallel
      const [imdWarnings, incoisWarnings, ndmaAlerts, earthquakes] = await Promise.all([
        fetchIMDWarnings(),
        fetchINCOISWarnings(),
        fetchNDMAAlerts(),
        fetchUSGSEarthquakes()
      ]);

      // Combine all alerts
      let allAlerts = [
        ...imdWarnings,
        ...incoisWarnings,
        ...ndmaAlerts,
        ...earthquakes
      ];

      // Sort alerts by severity
      const severityOrder = { Severe: 3, Moderate: 2, Normal: 1 };
      allAlerts.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);

      if (allAlerts.length > 0) {
        setAlerts(allAlerts);
      } else {
        setAlerts([{
          event: "No Active Alerts",
          description: "No significant disasters or alerts detected in India at this time",
          severity: "Normal",
          type: "none",
          latitude: 20.5937,
          longitude: 78.9629,
          date: new Date().toLocaleDateString()
        }]);
      }

    } catch (error) {
      console.error("Error fetching India alerts:", error);
      setAlerts([{
        event: "Error Fetching Alerts",
        description: "Unable to fetch alerts. Please try again later.",
        severity: "Normal",
        type: "error",
        latitude: 20.5937,
        longitude: 78.9629
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="content-container">
        <div className="button-container">
          <button 
            className="alert-button"
            onClick={requestLocationPermission}
            disabled={loading}
          >
            <i className="fas fa-map-marker-alt"></i>
            {loading ? 'Getting Location...' : 'Current Location CAP Alert'}
          </button>
          <button 
            className="alert-button"
            onClick={() => {
              setShowAllAlerts(true);
              fetchAllIndiaAlerts();
            }}
            disabled={loading}
          >
            <i className="fas fa-globe"></i>
            All India CAP Alert
          </button>
        </div>

        {locationError && (
          <div className="permission-error">
            <div className="error-content">
              <i className="fas fa-exclamation-circle"></i>
              <div className="error-message">
                <h3>Location Access Required</h3>
                <p>{locationError}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                checkPermissionStatus();
                requestLocationPermission();
              }} 
              className="retry-button"
            >
              <i className="fas fa-redo"></i> Try Again
            </button>
          </div>
        )}

        <div className="content">
          {loading ? (
            <div className="loading">Fetching alerts...</div>
          ) : (
            <>
              <div className="alerts-display">
                {alerts.length > 0 && (
                  <div className="alerts-list">
                    <h2>{showAllAlerts ? "All India Alerts" : "Local Alerts"}</h2>
                    {alerts.map((alert, index) => (
                      <div 
                        key={index} 
                        className={`alert-item ${alert.type}`} 
                        data-severity={alert.severity?.toLowerCase()}
                      >
                        <div className="alert-header">
                          <h3>{alert.event}</h3>
                          <span className={`alert-icon ${alert.type}`}></span>
                        </div>
                        <p>{alert.description}</p>
                        {alert.date && <p className="alert-date">Date: {alert.date}</p>}
                        {alert.region && <p className="alert-region">Region: {alert.region}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="map-container">
                <IndiaMap 
                  latitude={latitude} 
                  longitude={longitude} 
                  alerts={alerts}
                  showAllAlerts={showAllAlerts}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
