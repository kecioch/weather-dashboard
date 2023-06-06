import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import CurrentInfo from "./CurrentInfo";
import SideInfo from "./SideInfo";
import { getTimeString } from "../services/Time";

const Dashboard = ({ data }) => {
  const [currData, setCurrData] = useState();
  const [sideInfoData, setsideInfoData] = useState();
  console.log("DASHBOARD DATA", data);

  useEffect(() => {
    if (!data) return;

    // Get current date and time
    const currDate = new Date();
    currDate.setHours(currDate.getHours() - 1);
    currDate.setMinutes(0);
    const currTimeString = getTimeString(currDate);

    const currentTimeIndex = data.hourly.time.findIndex(
      (time) => time === currTimeString
    );

    // Set current data
    setCurrData({
      location: "Lüdenscheid, DE",
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
      .slice(1);

    // Get current date and time
    currDate.setHours(currDate.getHours() - 1);
    const currDateString = getTimeString(currDate);

    // Add 24 hours
    const toDate = new Date(currDate);
    toDate.setHours(toDate.getHours() + 25);
    const toDateString = getTimeString(toDate);

    const chartData = data.hourly.time
      .map((el, i) => ({
        date: el,
        temp: data.hourly.temperature_2m[i],
        // rain: data.hourly.precipitation_probability[i],
        // rain: data.hourly.is_day[i],
      }))
      .filter((el) => el.date <= toDateString && el.date >= currDateString);

    setsideInfoData({
      day: {
        chartData,
      },
      preview: {
        days,
      },
    });
  }, [data]);

  return (
    <div className={styles.dashboard}>
      <CurrentInfo data={currData} />
      <SideInfo data={sideInfoData} />
    </div>
  );
};

export default Dashboard;
