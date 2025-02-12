import { useState } from "react";

export const useCities = () => {
 
  const [cities, setCities] =useState([])
  const [error, setError] = useState(null)
 
 const getCities =  async(newCity)=> {
  if(!newCity) return;
 try{
  const response= await fetch(`https://nominatim.openstreetmap.org/search?city=${newCity}&format=json`)
  const json = await response.json()

  if (json.length === 0) {
    throw new Error(`No se encontraron resultados para "${newCity}"`);
  }

  const cityData= json.map(city=> ({
    id: city.place_id,
    name: city.display_name,
    lat: city.lat,
    lon: city.lon
  }))
  
  setCities(cityData);
  setError(null)
 } catch(e){
 setError(e)
 }
 };

 return { cities, getCities, error}

}
