import styles from "./WeatherIcon.module.css";
import "../lib/weather-icons/css/weather-icons.css";

const WeatherIcon = ({ code, className }) => {
  const getIconClass = () => {
    if (code === 0) return "wi-day-sunny";
    else if (code === 1) return "wi-day-cloudy";
    else if (code === 2) return "wi-cloud";
    else if (code === 3) return "wi-cloudy";
    else if ([45, 48].includes(code)) return "wi-fog";
    else if ([51, 53, 55, 56, 57].includes(code)) return "wi-sprinkle";
    else if ([61, 63, 65, 66, 77].includes(code)) return "wi-rain";
    else if ([71, 73, 75, 77].includes(code)) return "wi-snow";
    else if ([80, 81, 82].includes(code)) return "wi-showers";
    else if ([85, 86].includes(code)) return "wi-snow-wind";
    else if (code === 95) return "wi-thunderstorm";
    else if ([96, 99].includes(code)) return "wi-storm-showers";
    else return "wi-na";
  };

  return <i className={`wi ${getIconClass()} ${styles.icon} ${className}`}></i>;
};

export default WeatherIcon;
