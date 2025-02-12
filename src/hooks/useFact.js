import { useEffect, useState } from "react";

const RANDOM_FACT_ENDPOINT = 'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en'

export function useFact() {
    
    const [fact, setFact] = useState()

 //efecto para recuperar el facto
 useEffect(()=> {
    fetch(RANDOM_FACT_ENDPOINT)
    .then(res=> res.json())//objeto que contiene la respuesta
    .then((data)=> setFact(data.text)) //cuerpo de la respuesta
    .catch(error=> {
        alert("Error fetching the fact: ")
    })
}, [])

return { fact };
}
