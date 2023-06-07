import styles from "./PreviewDay.module.css";
import WeatherIcon from "./WeatherIcon";
import { Umbrella } from "react-bootstrap-icons";

const PreviewDay = ({ day }) => {
  const date = day && new Date(day.date);
  return (
    <div className={styles.card}>
      <p className={styles.weekday}>
        {date?.toLocaleString(navigator.language, { weekday: "long" })}
      </p>
      <WeatherIcon code={day?.weathercode.value} />
      <p className={styles.tempOverview}>
        {`${day?.temperature.max}${day?.temperature.unit}`} /{" "}
        {`${day?.temperature.min}${day?.temperature.unit}`}
      </p>
      <p className={styles.rain}>
        <Umbrella /> {`${day?.rain.value}${day?.rain.unit}`}
      </p>
    </div>
  );
};

export default PreviewDay;
