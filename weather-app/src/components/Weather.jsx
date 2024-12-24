import { FaWind } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsCloud } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchForecastByCity } from "../state/weatherSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import cloudImage from '../assets/cloud.jpg'
import rainImage from '../assets/rain.jpg'
import snowImage from '../assets/snow.jpg'
import sunnyImage from '../assets/sunny.jpg'
import Grid from '@mui/material/Grid2';
export default function Weather(){
    const [city,setCity] = useState("Tasikmalaya")
    const dispatch = useDispatch()
    function handleClick(){
        if(city.trim() != ""){
            const e = dispatch(fetchForecastByCity(city))
            e.then(res=>{
                if(res.error){
                    Swal.fire({
                        title : "Warning!",
                        icon :'warning',
                        text : "City not found!"
                    })
                }
            })
            
        }
    }
    
    useEffect(()=>{
        dispatch(fetchForecastByCity("Tasikmalaya"))
    },[dispatch])
    const dateString = '2024-12-25 01:30';
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric' };
    const today = date.toLocaleDateString('en-US', options);
    const forecast = useSelector((state) => state.weather.forecast)     
    const forecastHours = forecast?.forecast?.forecastday[0]?.hour
    const weatherCondition = forecast?.current?.condition?.text?.toLowerCase()
    console.log(forecast.current);
    
    let background = sunnyImage
    if(weatherCondition){
        if(weatherCondition.includes("sunny") || weatherCondition.includes("clear") ){
            background = sunnyImage
        }else if(weatherCondition.includes("rain")){
            background = rainImage
        }else if(weatherCondition.includes("snow")){
            background = snowImage
        }else if(weatherCondition.includes("cloud") || weatherCondition.includes("overcast") || weatherCondition.includes("mist") || weatherCondition.includes("fog")){
            background = cloudImage
        }
    }
    return (
        <div className="weather-container" style={{backgroundImage : `url(${background})`, backgroundPosition : 'center', backgroundSize : 'cover'}}>
            <Grid container spacing={2}>
                <Grid size={{xs : 12,md : 4}}>
                    <div className="side-section">
                        <div className="search-box">
                            <FaLocationDot className="icon"/>
                            <input value={city} onChange={e=>setCity(e.target.value)} type="text" />
                            <BiSearch style={{cursor : 'pointer'}} onClick={handleClick} className="icon"/>
                        </div>

                        <div className="temp-info">
                            <h1>{parseInt(forecast?.current?.temp_c)}°C</h1>
                            <p>
                                <FaWind/> {forecast?.current?.wind_dir} {parseInt(forecast?.current?.wind_kph)} km/h
                            </p>
                        </div>

                        <div className="forecast-days">
                            <h1 className='forecast-heading'>The Next Days Forecast</h1>
                            {forecast?.forecast?.forecastday?.map((day,index) => {

                                const dateStr = day.date;
                                const date = new Date(dateStr);
                                const formattedDate = date.toLocaleDateString('en-US', {weekday: 'long', month: 'long',day: 'numeric'});
                                return <div key={index} className="forecast-item">
                                    <div className="forecast-details">
                                        <div className="forecast-icon">
                                            <img src={day.day.condition.icon} alt="" />
                                        </div>
                                        <div className="details">
                                            <h2>{formattedDate}</h2>
                                            <p>{day.day.condition.text}</p>
                                        </div>
                                    </div>
                                    <div className="forecast-temp">
                                        <div className="temp-display">
                                            <h2>{parseInt(day.day.maxtemp_c)}°C</h2>
                                            <h2>{parseInt(day.day.mintemp_c)}°C</h2>
                                        </div>
                                    </div>
                                </div>
                            }

                            )}
                        </div>
                    </div>
                </Grid>
                <Grid size={{xs : 12,md : 8}}>
                    <div className="main-section">
                        <div className="weather-info">
                            <div className="location">
                                <h2>{forecast?.location?.name} - {forecast?.location?.country}</h2>
                                <h3 style={{marginTop:"5px"}}>Today, {today}</h3>
                            </div>
                            <div className="condition">
                                <h2>
                                    <img src={forecast?.current?.condition?.icon} alt="" />
                                    {forecast?.current?.condition?.text}
                                </h2>
                            </div>
                        </div>
                        <div className="weather-hours">
                            <Grid container spacing={2}>
                                {forecastHours?.map((hour,index) => 
                                    <Grid key={index} size={{xs:6,md:3,lg : 1.2}}>
                                        <div className="hour-card">
                                            <div className="hour-time">
                                                <p>{new Date(hour.time).toLocaleTimeString("en-GB",{hour : "2-digit",minute : "2-digit", hour12 : false})}</p>
                                            </div>
                                            <div className="hour-condition">
                                                <img src={hour.condition.icon}></img>
                                            </div>
                                            <div className="hour-temp">
                                                <h2>{parseInt(hour.temp_c)}°C</h2>
                                            </div>
                                        </div>
                                    </Grid>
                                )}
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
            
            
            

            
        </div>
    )
}