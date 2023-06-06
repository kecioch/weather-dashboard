import styles from "./Current.module.css";
import WeatherIcon from "./WeatherIcon";

const Current = ({ data }) => {
  return (
    <div className={styles.container}>
      <p>
        {data?.date.toLocaleString(navigator.language, { weekday: "long" })},
      </p>
      <p>{data?.date.toLocaleDateString()}</p>
      <h3>{`${data?.temperature.current}${data?.temperature.unit}`}</h3>
      <WeatherIcon code={data?.weathercode.value} className={styles.weatherIcon} />
      <p>
        {`${data?.temperature.max}${data?.temperature.unit}`} /{" "}
        {`${data?.temperature.min}${data?.temperature.unit}`}
      </p>
    </div>
  );
};

export default Current;
