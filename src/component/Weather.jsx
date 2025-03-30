import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searchicon from '../assets/search.png';  //importing image from assets folder
import windicon from '../assets/wind.png';
import humidityicon from '../assets/humidity.png';
import loader from '../assets/spinner.gif'; //importing spinner from assets folder


const Weather=()=>{
    const inputRef=useRef(); //store reference of the variable
    const [weatherData,setWeatherData]=useState(false); //variable weatherData with an initial value of false
    const [loading,setLoading]=useState(false); //variable loading with an initial value of false

    const allIcon = { //all set of icons with there specific image
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
        if (city===""){ //if user doesnt input any city
            alert("Enter City Name"); //alert will be provided
            setLoading(false); //update the loader to false
            return; 
        }

        setLoading(true); ////update the loader to false

        try {
            const api="f16cda736235b464fd8cb80ddd17dd7c"; //api
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`; 
            const response=await fetch(url); //fetching the api data
            const data=await response.json(); //coverting the data in json form
    
            

            if(!response.ok){ //if response is false it will provide a error alert
                setTimeout(()=>{ //wait for a specific time before execution 
                    alert(data.message);
                    setLoading(false); 
                },2000) // 2second
                return;
            }
            const icon=allIcon[data.weather[0].icon] || "https://openweathermap.org/img/wn/01d@2x.png"; //get a specific icon out of the list and if no is present give a default
        
            
            setTimeout(()=>{ 
                setWeatherData({ //update the weather data
                    humidity: data.main.humidity, //storing humidity
                    windSpeed: data.wind.speed, //storing speed
                    temperature: Math.floor(data.main.temp), //storing temperature only integer value
                    location: data.name, //location name
                    icon: icon 
                });
                setLoading(false);
            },3000); //3 second

        } catch(error){ //if error occurs
            console.error("Error fetching weather data:",error);
            setLoading(false); //update the loader
            setWeatherData(false); //update weather data to false
        }
    };

    useEffect(()=>{ // Code to run when the component mounts or updates
        search("Delhi"); 
    },[]);

    return ( //complete weather module input and data
        <div className="weather">
            <div className="searchbar">
                <input type="text" id='input' ref={inputRef} placeholder="Enter Location" />
                <img src={searchicon} alt="Error" onClick={()=>search(inputRef.current.value)}></img>
            </div>

            {loading?( //if loading is true display the image
                <img src={loader} alt="Loading" className="spinner"></img>
            ):weatherData?( //if weatherData is true display the data
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
                    </div><br></br>
                    <button className="refresh-btn" onClick={() => search(inputRef.current.value)}>Refresh</button> 
                </>
            ):( //when weatherData is false
                <span className='error'>Please enter a correct location</span>
            )}
        </div>
    );
};

export default Weather;
