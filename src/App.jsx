import React, { useState, useEffect } from 'react';
import './App.css';

const mockWeather = {
  'New York': { temp: 18, condition: 'Cloudy', humidity: 65, wind: 12, icon: '☁️', bg: 'cloudy' },
  'London': { temp: 12, condition: 'Rainy', humidity: 85, wind: 18, icon: '🌧️', bg: 'rainy' },
  'Tokyo': { temp: 22, condition: 'Clear', humidity: 45, wind: 8, icon: '☀️', bg: 'clear' },
  'Paris': { temp: 15, condition: 'Night', humidity: 70, wind: 5, icon: '🌙', bg: 'night' },
  'Sydney': { temp: 28, condition: 'Clear', humidity: 40, wind: 15, icon: '☀️', bg: 'clear' },
  'Mumbai': { temp: 32, condition: 'Hot', humidity: 75, wind: 10, icon: '🌤️', bg: 'hot' },
  'Dubai': { temp: 35, condition: 'Sunny', humidity: 30, wind: 6, icon: '🏜️', bg: 'sunny' },
  'Singapore': { temp: 27, condition: 'Thunderstorm', humidity: 90, wind: 20, icon: '⛈️', bg: 'stormy' }
};

const forecast = [
  { day: 'Mon', temp: 20, icon: '☀️', high: 22, low: 18 },
  { day: 'Tue', temp: 18, icon: '☁️', high: 20, low: 16 },
  { day: 'Wed', temp: 15, icon: '🌧️', high: 17, low: 13 },
  { day: 'Thu', temp: 16, icon: '⛈️', high: 18, low: 14 },
  { day: 'Fri', temp: 19, icon: '☀️', high: 21, low: 17 },
  { day: 'Sat', temp: 22, icon: '☀️', high: 24, low: 20 },
  { day: 'Sun', temp: 21, icon: '🌤️', high: 23, low: 19 }
];

const hourlyForecast = [
  { time: '12 AM', temp: 15, icon: '🌙' },
  { time: '3 AM', temp: 14, icon: '🌙' },
  { time: '6 AM', temp: 16, icon: '🌅' },
  { time: '9 AM', temp: 19, icon: '☀️' },
  { time: '12 PM', temp: 22, icon: '☀️' },
  { time: '3 PM', temp: 24, icon: '☀️' },
  { time: '6 PM', temp: 20, icon: '🌅' },
  { time: '9 PM', temp: 17, icon: '🌙' }
];

function App() {
  const [city, setCity] = useState('New York');
  const [weather, setWeather] = useState(mockWeather['New York']);
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('C'); // C or F

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    setTimeout(() => {
      const found = Object.keys(mockWeather).find(k => 
        k.toLowerCase() === searchInput.toLowerCase()
      );
      if (found) {
        setCity(found);
        setWeather(mockWeather[found]);
      } else {
        // Random weather for unknown cities
        const randomWeather = {
          temp: Math.floor(Math.random() * 25) + 10,
          condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 40) + 40,
          wind: Math.floor(Math.random() * 20) + 5,
          icon: ['☀️', '☁️', '🌧️', '🌤️'][Math.floor(Math.random() * 4)],
          bg: ['clear', 'cloudy', 'rainy', 'sunny'][Math.floor(Math.random() * 4)]
        };
        setCity(searchInput);
        setWeather(randomWeather);
      }
      setSearchInput('');
      setIsSearching(false);
    }, 800);
  };

  const convertTemp = (temp) => {
    if (selectedUnit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return temp;
  };

  const getBackgroundClass = () => {
    switch(weather.bg) {
      case 'clear': return 'bg-clear';
      case 'cloudy': return 'bg-cloudy';
      case 'rainy': return 'bg-rainy';
      case 'night': return 'bg-night';
      case 'hot': return 'bg-hot';
      case 'sunny': return 'bg-sunny';
      case 'stormy': return 'bg-stormy';
      default: return 'bg-clear';
    }
  };

  return (
    <div className={`weather-app ${getBackgroundClass()}`}>
      {/* Animated Background Elements */}
      <div className="bg-animation">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        {weather.bg === 'rainy' && <div className="rain-animation"></div>}
        {weather.bg === 'stormy' && <div className="lightning"></div>}
      </div>

      {/* Main Container */}
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="location-info">
            <div className="location-icon">📍</div>
            <div>
              <h1 className="city-name">{city}</h1>
              <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="unit-toggle">
              <button 
                className={`unit-btn ${selectedUnit === 'C' ? 'active' : ''}`}
                onClick={() => setSelectedUnit('C')}
              >
                °C
              </button>
              <button 
                className={`unit-btn ${selectedUnit === 'F' ? 'active' : ''}`}
                onClick={() => setSelectedUnit('F')}
              >
                °F
              </button>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search city (e.g. Tokyo, London, Mumbai)..."
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={isSearching}
          />
          <button type="submit" className="search-btn" disabled={isSearching}>
            {isSearching ? '🔍' : '🔍'}
          </button>
        </form>

        {/* Main Weather Display */}
        <div className="main-weather">
          <div className="weather-icon-large">{weather.icon}</div>
          <div className="temperature-display">
            <span className="temp-main">{convertTemp(weather.temp)}°</span>
            <span className="temp-unit">{selectedUnit}</span>
          </div>
          <h2 className="weather-condition">{weather.condition}</h2>
          <p className="feels-like">Feels like {convertTemp(weather.temp - 2)}°{selectedUnit}</p>
        </div>

        {/* Weather Stats */}
        <div className="weather-stats">
          <div className="stat-card">
            <div className="stat-icon">💨</div>
            <div className="stat-info">
              <span className="stat-value">{weather.wind} km/h</span>
              <span className="stat-label">Wind Speed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-info">
              <span className="stat-value">{weather.humidity}%</span>
              <span className="stat-label">Humidity</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌡️</div>
            <div className="stat-info">
              <span className="stat-value">1012 hPa</span>
              <span className="stat-label">Pressure</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👁️</div>
            <div className="stat-info">
              <span className="stat-value">10 km</span>
              <span className="stat-label">Visibility</span>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="forecast-section">
          <h3 className="section-title">Hourly Forecast</h3>
          <div className="hourly-forecast">
            {hourlyForecast.map((hour, idx) => (
              <div key={idx} className="hour-card">
                <span className="hour-time">{hour.time}</span>
                <span className="hour-icon">{hour.icon}</span>
                <span className="hour-temp">{convertTemp(hour.temp)}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="forecast-section">
          <h3 className="section-title">7-Day Forecast</h3>
          <div className="daily-forecast">
            {forecast.map((day, idx) => (
              <div key={idx} className="day-card">
                <span className="day-name">{day.day}</span>
                <span className="day-icon">{day.icon}</span>
                <div className="day-temps">
                  <span className="temp-high">{convertTemp(day.high)}°</span>
                  <span className="temp-low">{convertTemp(day.low)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <div className="info-card">
            <h4>🌅 Sunrise</h4>
            <p>6:24 AM</p>
          </div>
          <div className="info-card">
            <h4>🌇 Sunset</h4>
            <p>7:45 PM</p>
          </div>
          <div className="info-card">
            <h4>🌙 UV Index</h4>
            <p>Moderate (5)</p>
          </div>
          <div className="info-card">
            <h4>🌫️ Air Quality</h4>
            <p>Good (42)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
