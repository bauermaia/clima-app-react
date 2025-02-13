import { useState, useEffect } from "react";
import { getWeatherImage } from "../utils/getWeatherImage";


const WEATHER_ENDPOINT = `https://api.open-meteo.com/v1/forecast`
const GEOCODE_ENDPOINT= `https://nominatim.openstreetmap.org/reverse?format=json`
const EXTENDED_ENDPOINT = `https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,temperature_2m_min,weathercode`


export function useWeather (lat, lon) {
    const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [weatherCode, setWeatherCode]= useState()
  const [forecast, setForecast] = useState([])

   //efecto para recuperar el nombre de la ciduad
      useEffect(()=>{
          if(lat && lon){
              fetch(`${GEOCODE_ENDPOINT}&lat=${lat}&lon=${lon}`)
              .then(res=> res.json())
              .then(data=> {
                setCity(data.address.city || data.address.town || data.address.village)
                setCountry(data.address.country)
              })
          }
      },[lat,lon])

    useEffect(()=> {
        if (lat && lon) {
            fetch(`${EXTENDED_ENDPOINT}&latitude=${lat}&longitude=${lon}`)
            .then((res)=> res.json())
            .then((data)=>{
                if(data.daily) {
                    const forecastData= data.daily.time.map ((date, index)=> ({
                        day: date,
                        max: data.daily.temperature_2m_max[index],
                        min: data.daily.temperature_2m_min[index],
                        image: getWeatherImage(data.daily.weathercode[index]),
                    }) );

                    setForecast(forecastData)
                }
            })
            .catch((error)=> console.log("Error al obtener el pronóstico" , error))
        } 

    }, [lat, lon])
  

      
      //datos de clima
      useEffect(()=> {
          if(lat && lon)
              { fetch(`${WEATHER_ENDPOINT}?latitude=${lat}&longitude=${lon}&current_weather=true`)
          .then(res => res.json())
          .then(data=> {
              console.log(data)
              setTemperature(data.current_weather.temperature)
              setWeatherCode(data.current_weather.weathercode)
          });
              }
      }, [lat, lon]);

      // 🔹 Ahora usamos weatherCode para determinar la imagen
  const image = getWeatherImage(weatherCode);



  return { temperature, city, country, image, forecast}
}

