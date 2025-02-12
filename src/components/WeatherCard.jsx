import { useState, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCities } from "../hooks/useCities";

export function WeatherCard ()  {

  //almacena la lat y lon actual
  const {lat: geoLat, lon: geoLon} = useGeolocation();

  const [newCity, updateCity] = useState('') //almacena la ciudad buscada
  const {cities, getCities, error} = useCities() //almacena el array de ciudades con ese nombre
  const [showOptions, setShowOptions] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null) //Almacena la ciudad seleccionada

  const lat= selectedCity?.lat || geoLat;
  const lon= selectedCity?.lon||geoLon;
  
  //llama al hoock pero maneja los valores dentro de el
  const weatherData = useWeather(lat,lon);

  //acá guarda el valor de la nueva ciudad
  const handleChange = (event) => {
    updateCity(event.target.value)
  }

  //acá llama a la función para recuperar las ciudades
  const handleSubmit= (event) =>{
    event.preventDefault()
    getCities(newCity)
  }

  //si el array de ciudades tiene mas de 1 resultado, abre el modal de opciones
  useEffect(() => {
    if (cities.length > 1) {
      setShowOptions(true);
    } else{
      setSelectedCity(cities[0])
      updateCity('')
    }
  }, [cities]);
  

  //cuando se hace click en una de las opciones, se llama a la función handleClick pasandole la ciudad del array selecciondad
 const handleClick = (city)=>{
    setShowOptions(false)
    setSelectedCity(city)
    updateCity('')
  }

    return(
      <>
        <div className="card">
        <div className="search">
        <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Introduce la ciudad" value= {newCity} onChange={handleChange}/>
        <button className="search__button" >
          <img className="search__img" src="images/search.png"/>
          </button>
          {
            cities.length>1 && showOptions && (
              <div className="opciones">
                <ul className="opciones-ul">
                {cities.map((city) => (
                <li className="opciones-li" key={city.id} onClick={()=> handleClick(city)}>{city.name}</li>
              ))}
                </ul>
              </div>
            )
          } 
          {
            error && (
              <div className="error">{error?.message}</div>
            )
          }
        </form>
      
         
        
        </div>
            <img className='weather__img' src={`images/${weatherData.image}.png`}  alt="Weather icon" />
            <h1 className="temp">Temperature: {weatherData.temperature}°c</h1>
            <h2 className="city">Location: {weatherData.city},</h2>
            <h3 className="pais">{weatherData.country}</h3>
        </div>
      </>
    )

}