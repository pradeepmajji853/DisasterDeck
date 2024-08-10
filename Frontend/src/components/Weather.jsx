import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState(city); // State to manage current city being searched

  const apiKey = '4eb3703790b356562054106543b748b2';

  useEffect(() => {
    const fetchWeatherData = async (cityToFetch) => {
      setLoading(true);
      setError(null); // Reset error state before making a new request

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityToFetch)}&appid=${apiKey}&units=metric`
        );

        if (response.data.cod === 200) {
          setWeatherData(response.data);
          setError(null);
        } else {
          // If city not found, fall back to Hyderabad
          if (cityToFetch !== 'Hyderabad') {
            fetchWeatherData('Hyderabad');
          } else {
            setError('Failed to fetch weather data');
          }
        }
      } catch (err) {
        // If there was an error and the city was not Hyderabad, fallback to Hyderabad
        if (cityToFetch !== 'Hyderabad') {
          fetchWeatherData('Hyderabad');
        } else {
          setError('Failed to fetch weather data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData(currentCity);

  }, [currentCity]);

  // Use an effect to update the city state if the prop changes
  useEffect(() => {
    setCurrentCity(city);
  }, [city]);

  return (
    <div>
      <h1>Weather App</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
