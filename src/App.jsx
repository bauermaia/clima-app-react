import './App.css'
import { useFact } from "./hooks/useFact";
import { FactCard } from './components/FactCard'
import { WeatherCard } from './components/WeatherCard'

export function App() {

   const { fact } = useFact()
    
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
        <WeatherCard />
        <button className='refresh-button' onClick={handleRefresh}>Refresh 🔁 </button>
        </main>
       </>
        
    )
}
