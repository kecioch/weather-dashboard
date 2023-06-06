import {
  BrightnessHigh,
  Droplet,
  Sunrise,
  Sunset,
  Umbrella,
  Wind,
} from "react-bootstrap-icons";
import styles from "./Details.module.css";

const Details = ({ data }) => {
  return (
    <div className={styles.container}>
      <p className={styles.rain}>
        <Umbrella /> {`${data?.rain.value}${data?.rain.unit}`}
      </p>
      <p className={styles.humidity}>
        <Droplet /> {`${data?.humidity.value}${data?.humidity.unit}`}
      </p>
      <p className={styles.uv}>
        <BrightnessHigh /> {`${data?.uv_index.value}${data?.uv_index.unit}`}
      </p>
      <p className={styles.wind}>
        <Wind /> {`${data?.windspeed.value}${data?.windspeed.unit}`}
      </p>
      <p className={styles.sunrise}>
        <Sunrise /> {data?.sunrise}
      </p>
      <p className={styles.sunset}>
        <Sunset /> {data?.sunset}
      </p>
    </div>
  );
};

export default Details;
