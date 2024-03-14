import React, { useCallback, useState } from "react";
import { FaSearch, FaWind } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');
    const [error, setError] = useState('');

    const API_key = "56583a94f85c62c729c607dca2675c87";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

    function handleOnChange(e) {
        setCity(e.target.value);
    }

    async function fetchData() {
        try { 
            let response = await fetch(url);
            let output = await response.json();
            if (response.ok) {
                setWeather(output);
                console.log(output);
                setError('');
            }
            else {
                setError('invalid city name.')
            }
        }
        catch (error) { 
        }
    }
    return ( 
        <div className="container">
            <div className="city">
                <div className="search">
                    <input type="text" placeholder="enter a city name" value={city} onChange={handleOnChange}></input>
                    <button onClick={() => fetchData()}><FaSearch/></button>    
                </div>
            </div>
            {error && <p className='error-message'>{error}</p>}

            {
                weather && weather.weather && 
                <div className="content">
                        <div className="weather-image">
                            <img className="img-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''></img>
                            <h3 className="desc">{weather.weather[0].description.toUpperCase()}</h3>
                        </div>
                        <div className="weather-temp">
                            <h2 className="temp">{weather.main.temp}&deg;C</h2>
                        </div>
                        <div className="weather-location">
                            <MdLocationOn></MdLocationOn>
                            <span>{weather.name},{weather.sys.country}</span>
                        </div>
                        <div className="wind-humidity">
                            <div className="wind">
                                <FaWind></FaWind><br/>
                                {weather.wind.speed}km/hr
                                <h4>WIND-SPEED</h4>
                            </div>
                            <div className="humid">
                                <WiHumidity></WiHumidity><br/>
                                {weather.main.humidity}%
                                <h4>HUMIDITY</h4>
                            </div>
                        </div>
                </div>
            }
        </div>
     );
}
 
export default Weather;