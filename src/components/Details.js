import {
  BrightnessHigh,
  Droplet,
  Sunrise,
  Sunset,
  Umbrella,
  Wind,
} from "react-bootstrap-icons";
import styles from "./Details.module.css";
import Placeholder from "./Placeholder";

const Details = ({ data, isLoading }) => {
  return (
    <div className={styles.container}>
      <div className={styles.rain}>
        {isLoading && <Placeholder />}
        {!isLoading && (
          <span>
            <Umbrella /> {`${data?.rain.value}${data?.rain.unit}`}
          </span>
        )}
      </div>
      <div className={styles.humidity}>
        {isLoading && <Placeholder />}
        {!isLoading && (
          <span>
            <Droplet /> {`${data?.humidity.value}${data?.humidity.unit}`}
          </span>
        )}
      </div>
      <div className={styles.uv}>
        {isLoading && <Placeholder />}
        {!isLoading && (
          <span>
            <BrightnessHigh /> {`${data?.uv_index.value}${data?.uv_index.unit}`}
          </span>
        )}
      </div>
      <div className={styles.wind}>
        {isLoading && <Placeholder />}
        {!isLoading && (
          <span>
            <Wind /> {`${data?.windspeed.value}${data?.windspeed.unit}`}
          </span>
        )}
      </div>
      <div className={styles.sunrise}>
        {isLoading && <Placeholder />}
        {!isLoading && (
          <span>
            <Sunrise /> {data?.sunrise}
          </span>
        )}
      </div>
      <div className={styles.sunset}>
        {isLoading && <Placeholder />}
        {!isLoading && (
          <span>
            <Sunset /> {data?.sunset}
          </span>
        )}
      </div>
    </div>
  );
};

export default Details;
