import './App.css'
import { useEffect, useState } from 'react'

const RANDOM_FACT_ENDPOINT = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en'
const WEATHER_ENDPOINT = `https://api.open-meteo.com/v1/forecast`
const GEOCODE_ENDPOINT= `https://nominatim.openstreetmap.org/reverse?format=json`




export function App() {

    const [fact, setFact] = useState()
    const[lat, setLat] = useState()
    const[lon, setLon]= useState()
    const [temperature, setTemperature]= useState()
    const [city, setCity]= useState()
    const [country, setCountry]= useState()
    const [weatherCode, setWeatherCode]= useState()
    const [image, setImage]= useState()
    

    //efecto para recuperar el texto original
    useEffect(()=> {
        fetch(RANDOM_FACT_ENDPOINT)
        .then(res=> {
            if(!res.ok) {
                throw new Error("Failed to fetch");
            }

            return res.json()
        })//objeto que contiene la respuesta
        .then(data=> { //cuerpo de la respuesta
            const { text } = data
            setFact(text)
        })
        .catch(error=> {
            alert("Error fetching the fact: ")
        })
    }, [])

    const FactCard =({fact}) => {
        if(!fact) return null;

        return (
            <>
            <div className='fact-card'>
            <h1>{fact}</h1>
            </div>
            </>
        )
    }

    //efecto para detectar latitud y longitud
    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude)
                    setLon(position.coords.longitude)
                },
                (error) => {
                    alert("Hay un error para obtener la localización");
                }
            );

        } else {
            console.error("No es posible obtener la localización");
        }
    },[])

    //efecto para recuperar el nombre de la ciduad
    useEffect(()=>{
        if(lat && lon){
            fetch(`${GEOCODE_ENDPOINT}&lat=${lat}&lon=${lon}`)
            .then(res=> res.json())
            .then(data=> {
                const city= data.address.city
                setCity(city)
                const country=data.address.country
                setCountry(country)

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
            const temperature = data.current_weather.temperature
            setTemperature(temperature)
            const weatherDescription= data.current_weather.weathercode
            setWeatherCode(weatherDescription)
        });
            }
    }, [lat, lon]);

    //definir descripción del clima
    useEffect(() => {
        if (weatherCode !== undefined) {
            if (weatherCode < 2) {
                setImage('clear');
            } else if (weatherCode < 45) {
                setImage('clouds');
            } else if (weatherCode < 51) {
                setImage('mist');
            } else if (weatherCode < 61) {
                setImage('rain');
            } else if (weatherCode < 71) {
                setImage('snow');
            } else if (weatherCode < 95) {
                setImage('wind');
            } else {
                setImage('unknown'); // Para valores no considerados
            }
        }
    }, [weatherCode]);


    const WeatherCard = ({temperature, city, country, image}) => {
        

        if(!temperature || !city || !country) return null;
        return(
          <>
            <div className="card">
                <img className='weather__img' src={`images/${image}.png`}  alt="Weather icon" />
                <h1 className="temp">Temperature: {temperature}°c</h1>
                <h2 className="city">Location: {city},</h2>
                <h3 className="pais">{country}</h3>
            </div>
          </>
        )

    }

    const handleRefresh =() =>{
        window.location.reload();
    }


    return (
       <>
        <main>
        <h1 className='card'>Weather ⛅ and random fact 🤔 </h1>
        <FactCard
        fact={fact}
        />
        <WeatherCard
        temperature= {temperature}
        city={city}
        country={country}
        image={image}
        />
        <button className='refresh-button' onClick={handleRefresh}>Refresh 🔁 </button>
        </main>
       </>
        
    )
}
