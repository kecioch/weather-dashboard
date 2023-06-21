import Container from "./Container";
import styles from "./Current.module.css";
import Placeholder from "./Placeholder";
import WeatherIcon from "./WeatherIcon";

const Current = ({ data, isLoading }) => {
  return (
    <Container className={styles.container}>
      {!isLoading && (
        <>
          <p className={styles.weekday}>
            {data?.date.toLocaleString(navigator.language, { weekday: "long" })}
            ,
          </p>
          <p className={styles.date}>{data?.date.toLocaleDateString()}</p>

          <h3>{`${data?.temperature.current}${data?.temperature.unit}`}</h3>
          <WeatherIcon
            code={data?.weathercode.value}
            className={styles.weatherIcon}
          />

          <p className={styles.tempOverview}>
            {`${data?.temperature.max}${data?.temperature.unit}`} /{" "}
            {`${data?.temperature.min}${data?.temperature.unit}`}
          </p>
        </>
      )}

      {isLoading && (
        <>
          <Placeholder
            style={{ width: "8em", height: "2em", dispay: "inline" }}
          />
          <Placeholder style={{ marginTop: "0.5em", width: "8em" }} />
          <Placeholder
            style={{ marginTop: "1em", height: "2em", width: "6em" }}
          />
          <Placeholder
            style={{
              marginTop: "1em",
              marginBottom: "1.5em",
              height: "4em",
              width: "4em",
            }}
          />
          <Placeholder style={{ marginTop: "0.5em", width: "10em" }} />
        </>
      )}
    </Container>
  );
};

export default Current;
