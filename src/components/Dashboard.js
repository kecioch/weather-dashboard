import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import CurrentInfo from "./CurrentInfo";
import SideInfo from "./SideInfo";
import { getTimeString } from "../services/Time";
import Container from "./Container";

const Dashboard = ({ data, isLoading }) => {
  const [currData, setCurrData] = useState();
  const [sideInfoData, setsideInfoData] = useState();

  useEffect(() => {
    if (!data) return;

    // Get current date and time
    const currDate = new Date();
    currDate.setHours(currDate.getHours());
    currDate.setMinutes(0);
    const currTimeString = getTimeString(currDate, data.timezone);

    const currentTimeIndex = data.hourly.time.findIndex(
      (time) => time === currTimeString
    );

    // Set current data
    setCurrData({
      location: data.location,
      date: currDate,
      temperature: {
        current: data.hourly.temperature_2m[currentTimeIndex],
        max: data.daily.temperature_2m_max[0],
        min: data.daily.temperature_2m_min[0],
        unit: data.hourly_units.temperature_2m,
      },
      sunrise: data.daily.sunrise[0].substr(11),
      sunset: data.daily.sunset[0].substr(11),
      weathercode: {
        value: data.hourly.weathercode[currentTimeIndex],
        unit: data.hourly_units.weathercode,
      },
      uv_index: {
        value: data.hourly.uv_index[currentTimeIndex],
        unit: data.hourly_units.uv_index,
      },
      windspeed: {
        value: data.hourly.windspeed_10m[currentTimeIndex],
        unit: data.hourly_units.windspeed_10m,
      },
      humidity: {
        value: data.hourly.relativehumidity_2m[currentTimeIndex],
        unit: data.hourly_units.relativehumidity_2m,
      },
      rain: {
        value: data.hourly.precipitation_probability[currentTimeIndex],
        unit: data.hourly_units.precipitation_probability,
      },
    });

    // Set sideInfo data
    const days = data.daily.time
      .map((time, i) => ({
        date: time,
        temperature: {
          max: data.daily.temperature_2m_max[i],
          min: data.daily.temperature_2m_min[i],
          unit: data.daily_units.temperature_2m_max,
        },
        rain: {
          value: data.daily.precipitation_probability_max[i],
          unit: data.daily_units.precipitation_probability_max,
        },
        weathercode: {
          value: data.daily.weathercode[i],
          unit: data.daily_units.weathercode,
        },
      }))
      .slice(1, 6);
    // Get current date and time
    const currentDate = new Date();
    currentDate.setMinutes(0);
    const currDateString = getTimeString(currentDate, data.timezone);

    // Add 24 hours
    const toDate = new Date(currentDate);
    toDate.setHours(toDate.getHours() + 24);
    const toDateString = getTimeString(toDate, data.timezone);

    const chartData = data.hourly.time
      .map((el, i) => ({
        date: el,
        temp: data.hourly.temperature_2m[i],
      }))
      .filter((el) => el.date <= toDateString && el.date >= currDateString);

    setsideInfoData({
      day: {
        units: {
          temp: data.hourly_units.temperature_2m,
        },
        chart: chartData,
      },
      preview: {
        days,
      },
    });
  }, [data]);

  return (
    <Container className={styles.dashboard}>
      <CurrentInfo data={currData} isLoading={isLoading || !currData} />
      <SideInfo data={sideInfoData} isLoading={isLoading || !sideInfoData} />
    </Container>
  );
};

export default Dashboard;
