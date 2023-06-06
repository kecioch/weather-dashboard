import styles from "./PreviewDay.module.css";
import WeatherIcon from "./WeatherIcon";
import { Umbrella } from "react-bootstrap-icons";

const PreviewDay = ({ day }) => {
  const date = day && new Date(day.date);
  return (
    <div className={styles.card}>
      <p>{date?.toLocaleString(navigator.language, { weekday: "long" })}</p>
      <WeatherIcon />
      <p>
        {`${day?.temperature.max}${day?.temperature.unit}`} /{" "}
        {`${day?.temperature.min}${day?.temperature.unit}`}
      </p>
      <p>
        <Umbrella /> {`${day?.rain.value}${day?.rain.unit}`}
      </p>
    </div>
  );
};

export default PreviewDay;
