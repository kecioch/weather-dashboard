import styles from "./Details.module.css";

const Details = ({ data }) => {
  return (
    <div className={styles.container}>
      <p className={styles.rain}>
        RG {`${data?.rain.value}${data?.rain.unit}`}
      </p>
      <p className={styles.humidity}>
        LF {`${data?.humidity.value}${data?.humidity.unit}`}
      </p>
      <p className={styles.uv}>
        UV {`${data?.uv_index.value}${data?.uv_index.unit}`}
      </p>
      <p className={styles.wind}>
        WD {`${data?.windspeed.value}${data?.windspeed.unit}`}
      </p>
      <p className={styles.sunrise}>SA {data?.sunrise}</p>
      <p className={styles.sunset}>SU {data?.sunset}</p>
    </div>
  );
};

export default Details;
