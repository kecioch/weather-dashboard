import styles from "./PreviewDay.module.css";
import WeatherIcon from "./WeatherIcon";

const PreviewDay = ({ day }) => {
  return (
    <div className={styles.card}>
      <p>
        {day?.date.toLocaleString(navigator.language, { weekday: "long" })}
      </p>
      <WeatherIcon />
      <p>
        {`${day?.temperature.max}${day?.temperature.unit}`} /{" "}
        {`${day?.temperature.min}${day?.temperature.unit}`}
      </p>
      <p>RG {`${day?.rain.value}${day?.rain.unit}`}</p>
    </div>
  );
};

export default PreviewDay;
