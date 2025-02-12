
export function getWeatherImage(weatherCode) {
    if (weatherCode <= 2) return "clear";
    if (weatherCode <= 45) return "clouds";
    if (weatherCode <= 51) return "mist";
    if (weatherCode <= 61) return "rain";
    if (weatherCode <= 71) return "snow";
    if (weatherCode <= 95) return "wind";
    return "unknown"; // Si el código no está contemplado
  }
  