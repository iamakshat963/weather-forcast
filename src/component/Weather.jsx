import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searchicon from '../assets/search.png';
import windicon from '../assets/wind.png';
import humidityicon from '../assets/humidity.png';
import loader from '../assets/spinner.gif'; 

const Weather=()=>{
    const inputRef=useRef();
    const [weatherData,setWeatherData]=useState(false);
    const [loading,setLoading]=useState(false); 

    const allIcon = {
        "01d": "https://openweathermap.org/img/wn/01d@2x.png",
        "01n": "https://openweathermap.org/img/wn/01n@2x.png",
        "02d": "https://openweathermap.org/img/wn/02d@2x.png",
        "02n": "https://openweathermap.org/img/wn/02n@2x.png",
        "03d": "https://openweathermap.org/img/wn/03d@2x.png",
        "03n": "https://openweathermap.org/img/wn/03n@2x.png",
        "04d": "https://openweathermap.org/img/wn/04d@2x.png",
        "04n": "https://openweathermap.org/img/wn/04n@2x.png",
        "09d": "https://openweathermap.org/img/wn/09d@2x.png",
        "09n": "https://openweathermap.org/img/wn/09n@2x.png",
        "10d": "https://openweathermap.org/img/wn/10d@2x.png",
        "10n": "https://openweathermap.org/img/wn/10n@2x.png",
        "13d": "https://openweathermap.org/img/wn/13d@2x.png",
        "13n": "https://openweathermap.org/img/wn/13n@2x.png"
    };

    const search=async (city)=>{
        if (city===""){
            alert("Enter City Name");
            setLoading(false); 
            return;
        }

        setLoading(true);

        try {
            const api="f16cda736235b464fd8cb80ddd17dd7c";
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`; 
            const response=await fetch(url);
            const data=await response.json();

            if(!response.ok){
                setTimeout(()=>{
                    alert(data.message);
                    setLoading(false);
                },2000)
                return;
            }
            const icon=allIcon[data.weather[0].icon] || "https://openweathermap.org/img/wn/01d@2x.png";
            
            setTimeout(()=>{ 
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon 
                });
                setLoading(false);
            },3000);

        } catch(error){
            console.error("Error fetching weather data:",error);
            setLoading(false);
            setWeatherData(false);
        }
    };

    useEffect(()=>{
        search("Delhi");
    },[]);

    return (
        <div className="weather">
            <div className="searchbar">
                <input type="text" ref={inputRef} placeholder="Enter Location" />
                <img src={searchicon} alt="Error" onClick={()=>search(inputRef.current.value)}></img>
            </div>

            {loading?( 
                <img src={loader} alt="Loading" className="spinner"></img>
            ):weatherData?(
                <>
                    <img src={weatherData.icon} alt="Error" className='weather-icon'></img>
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weatherdata">
                        <div className='col'>
                            <img src={humidityicon} alt="Error"></img>
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <p>Humidity</p>
                            </div>
                        </div>

                        <div className='col'>
                            <img src={windicon} alt="Error" />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ):(
                <span className='error'>Please enter a correct location</span>
            )}
        </div>
    );
};

export default Weather;
