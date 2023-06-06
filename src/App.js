import "./App.css";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import Dashboard from "./components/Dashboard";
import { getTimeString } from "./services/Time";

function App() {
  const [data, setData] = useState();
  const [chartData, setChartData] = useState();

  // Get current date and time
  const currDate = new Date();
  currDate.setHours(currDate.getHours() - 1);
  const currDateString = getTimeString(currDate);

  // Add 24 hours
  const toDate = new Date(currDate);
  toDate.setHours(toDate.getHours() + 25);
  const toDateString = getTimeString(toDate);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.2185&longitude=7.659&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=Europe%2FBerlin"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        const chart = data.hourly.time
          .map((el, i) => ({
            date: el,
            temp: data.hourly.temperature_2m[i],
            // rain: data.hourly.precipitation_probability[i],
            rain: data.hourly.is_day[i],
          }))
          .filter((el) => el.date <= toDateString && el.date >= currDateString);
        setChartData(chart);
      });
  }, []);

  return (
    <div className="App">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
