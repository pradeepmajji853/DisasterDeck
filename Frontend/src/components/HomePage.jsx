import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import Weather from "./Weather.jsx";
import IndiaMap from "./IndiaMap.jsx";


import Alerts from "./Alerts.jsx";
const HomePage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("Hyderabad");
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            try {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
              );

              console.log("API Response:", response.data);

              const address = response.data.address;
              const fetchedCity =
                address.city || address.town || address.village;
              if (fetchedCity) {
                setCity(fetchedCity);
                console.log("City:", fetchedCity);
              } else {
                setCity("Hyderabad"); // Fallback to Hyderabad if city not found
              }
            } catch (error) {
              console.error("Error fetching city:", error);
              setCity("Hyderabad"); // Fallback to Hyderabad on error
            }
          },
          (error) => {
            console.error("Error getting location:", error.message);
            setLocationError(
              "Unable to retrieve location. Please allow location access."
            );
            setCity("Hyderabad"); // Fallback to Hyderabad on geolocation error
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLocationError("Geolocation is not supported by this browser.");
        setCity("Hyderabad"); // Fallback to Hyderabad if geolocation is not supported
      }
    };

    getLocation();
  }, []);

  return (
    <div className="container">
      <div className="content-container">
        <div className="button-container">
          <button className="alert-button">
            <i className="fas fa-map-marker-alt"></i>
            Current Location CAP Alert
          </button>
          <button className="alert-button">
            <i className="fas fa-globe"></i>
            All India CAP Alert
          </button>
        </div>

        <div className="content">
          <div className="map-container">
            <IndiaMap latitude={latitude} longitude={longitude} />
          </div>
          <div className="alert-list">
            <Alerts />
          </div>
        </div>
      </div>
      <div className="weather-card">
        <Weather city={city} />
      </div>
    </div>
  );
};

export default HomePage;
