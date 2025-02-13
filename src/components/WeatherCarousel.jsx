import { Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'; //importa estilos básicos
import 'swiper/css/navigation' //importa estilos para botones de navegacion
import 'swiper/css/pagination'; //importa estilos para indicadores de paginacion
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import { useWeather } from '../hooks/useWeather';

export const WeatherCarousel = ({lat, lon}) => {

    const {forecast} = useWeather(lat, lon)

    console.log(forecast)


   return (
    <Swiper effect="coverflow"
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={"auto"}
     navigation pagination={{ clickable: true }}
     modules={[EffectCoverflow, Navigation, Pagination]}>


         {forecast?.length > 0 ? (
                forecast.map(({ day, max, min, image }, index) => (
                    <SwiperSlide key={index}>
                        <div>
                            <h3 className="day">{(new Date(day).toLocaleDateString('es-ES', { weekday: 'long' })).charAt(0).toUpperCase() + new Date(day).toLocaleDateString('es-ES', { weekday: 'long' }).slice(1)}</h3>
                            <img src={`/images/${image}.png`} alt={`Weather icon for ${day}`} className="weather-icon" />
                            <h1 className="temp">Max: {max}°C</h1>
                            <h2 className="temp">Min: {min}°C</h2>
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <SwiperSlide>
                    <div>
                        <h3 className="day">Cargando...</h3>
                    </div>
                </SwiperSlide>
            )}
            
    </Swiper>
   );

};

export default WeatherCarousel;