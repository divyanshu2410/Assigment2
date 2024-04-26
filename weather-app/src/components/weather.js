import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = `54b830f9b29034ff7dbacae19de35244`

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setError('Invalid city name or API request failed.');
            setWeatherData(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder="Enter city name" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} />
                <button type="submit">Get details</button>
            </form>

            {error && <p>{error}</p>}

            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speeed: {weatherData.wind.speed}m/s</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                </div>
            )}

        </div>
    )
}

export default Weather;
