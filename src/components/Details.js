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
      <div className={styles.rain}>
        <span>
          <Umbrella /> {`${data?.rain.value}${data?.rain.unit}`}
        </span>
      </div>
      <div className={styles.humidity}>
        <span>
          <Droplet /> {`${data?.humidity.value}${data?.humidity.unit}`}
        </span>
      </div>
      <div className={styles.uv}>
        <span>
          <BrightnessHigh /> {`${data?.uv_index.value}${data?.uv_index.unit}`}
        </span>
      </div>
      <div className={styles.wind}>
        <span>
          <Wind /> {`${data?.windspeed.value}${data?.windspeed.unit}`}
        </span>
      </div>
      <div className={styles.sunrise}>
        <span>
          <Sunrise /> {data?.sunrise}
        </span>
      </div>
      <div className={styles.sunset}>
        <span>
          <Sunset /> {data?.sunset}
        </span>
      </div>
    </div>
  );
};

export default Details;
