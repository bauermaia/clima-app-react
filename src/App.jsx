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
        <h1 className='card'>Weather Forecast⛅ </h1>
       
        <WeatherCard />
       
        <button className='refresh-button' onClick={handleRefresh}>Refresh 🔁 </button>
        </main>
       </>
        
    )
}
