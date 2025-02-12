import { useState, useEffect } from "react";
import { getWeatherImage } from "../utils/getWeatherImage";


const WEATHER_ENDPOINT = `https://api.open-meteo.com/v1/forecast`
const GEOCODE_ENDPOINT= `https://nominatim.openstreetmap.org/reverse?format=json`

export function useWeather (lat, lon) {
    const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [weatherCode, setWeatherCode]= useState()

   //efecto para recuperar el nombre de la ciduad
      useEffect(()=>{
          if(lat && lon){
              fetch(`${GEOCODE_ENDPOINT}&lat=${lat}&lon=${lon}`)
              .then(res=> res.json())
              .then(data=> {
                console.log('data: ' , data)
                setCity(data.address.city || data.address.town || data.address.village)
                setCountry(data.address.country)
              })
          }
      },[lat,lon])
  

      
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



  return { temperature, city, country, image }
}

