import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState(city);

  const apiKey = '4eb3703790b356562054106543b748b2';

  useEffect(() => {
    const fetchWeatherData = async (cityToFetch) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityToFetch)}&appid=${apiKey}&units=metric`
        );

        if (response.data.cod === 200) {
          setWeatherData(response.data);
          setError(null);
        } else {
          if (cityToFetch !== 'Hyderabad') {
            fetchWeatherData('Hyderabad');
          } else {
            setError('Failed to fetch weather data');
          }
        }
      } catch (err) {
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

  useEffect(() => {
    setCurrentCity(city);
  }, [city]);

  const getBackgroundStyle = () => {
    if (!weatherData) return {};

    const mainWeather = weatherData.weather[0].main.toLowerCase();

    switch (mainWeather) {
      case 'clear':
        return { backgroundImage: 'url(https://tse4.mm.bing.net/th?id=OIP.W28NEMaZMYqFAiR-blEUPwHaE8&pid=Api&P=0&h=180)', backgroundColor: '#87ceeb' };
      case 'clouds':
        return { backgroundImage: 'url(https://tse4.mm.bing.net/th?id=OIP.W28NEMaZMYqFAiR-blEUPwHaE8&pid=Api&P=0&h=180)', backgroundColor: '#d3d3d3' };
      case 'rain':
        return { backgroundImage: 'urlhttps://tse4.mm.bing.net/th?id=OIP.W28NEMaZMYqFAiR-blEUPwHaE8&pid=Api&P=0&h=180)', backgroundColor: '#708090' };
      case 'snow':
        return { backgroundImage: 'url(https://tse4.mm.bing.net/th?id=OIP.W28NEMaZMYqFAiR-blEUPwHaE8&pid=Api&P=0&h=180)', backgroundColor: '#f0f8ff' };
      case 'thunderstorm':
        return { backgroundImage: 'url(https://tse4.mm.bing.net/th?id=OIP.W28NEMaZMYqFAiR-blEUPwHaE8&pid=Api&P=0&h=180)', backgroundColor: '#2f4f4f' };
      case 'mist':
      case 'fog':
        return { backgroundImage: 'url(https://tse4.mm.bing.net/th?id=OIP.W28NEMaZMYqFAiR-blEUPwHaE8&pid=Api&P=0&h=180)', backgroundColor: '#778899' };
      default:
        return { backgroundColor: '#f0f0f0' }; 
    }
  };

  return (
    <div style={{ ...styles.container, ...getBackgroundStyle() }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={currentCity}
        onChange={(e) => setCurrentCity(e.target.value)}
        style={styles.input}
      />

      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {weatherData && (
        <div style={styles.weatherDataContainer}>
          <h2 style={styles.cityName}>{weatherData.name}</h2>
          <p style={styles.description}>{weatherData.weather[0].description}</p>
          <p style={styles.temperature}>{weatherData.main.temp} °C</p>
          <div style={styles.additionalInfo}>
            <p style={styles.infoItem}>Humidity: {weatherData.main.humidity}%</p>
            <p style={styles.infoItem}>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '350px',
    margin: '20px auto',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  loading: {
    fontSize: '1.2em',
    color: '#ccc',
  },
  error: {
    fontSize: '1.2em',
    color: 'red',
  },
  weatherDataContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    borderRadius: '8px',
  },
  cityName: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  temperature: {
    fontSize: '2em',
    marginBottom: '10px',
  },
  additionalInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoItem: {
    fontSize: '1em',
  },
};

export default Weather;
