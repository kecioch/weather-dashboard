import styles from "./CurrentInfo.module.css";
import WeatherIcon from "./WeatherIcon";

const CurrentInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.location}>
        <span>Lüdenscheid, DE</span>
      </div>
      <div className={styles.main}>
        <p>Freitag,</p>
        <p>31.05.2023</p>
        <h3>24°C</h3>
        <WeatherIcon />
        <p>23°C / 16°C</p>
      </div>
      <div className={styles.details}></div>
    </div>
  );
};

export default CurrentInfo;
