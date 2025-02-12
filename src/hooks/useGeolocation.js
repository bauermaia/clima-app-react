import { useState, useEffect } from "react";

export function useGeolocation () {
    const [lat, setLat]= useState(null)
    const [lon, setLon]= useState(null)

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

        return {lat, lon}
}