import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const getTimeString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function App() {
  const [chartData, setChartData] = useState();

  // Get current date and time
  const currDate = new Date();
  currDate.setHours(currDate.getHours() - 1)
  const currDateString = getTimeString(currDate);
  console.log(currDateString);

  // Add 24 hours
  const toDate = new Date(currDate);
  toDate.setHours(toDate.getHours() + 25);
  const toDateString = getTimeString(toDate);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.2185&longitude=7.659&hourly=temperature_2m,rain,showers,snowfall,weathercode,is_day&daily=weathercode,sunrise,sunset&timezone=auto"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const chart = data.hourly.time
          .map((el, i) => ({
            name: el,
            value: data.hourly.temperature_2m[i],
          }))
          .filter((el) => el.name <= toDateString && el.name >= currDateString);
        setChartData(chart);
        console.log(chart);
      });
  }, []);

  return (
    <div className="App">
      <LineChart width={400} height={300} data={chartData}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          name="Temperatur"
        />
      </LineChart>
    </div>
  );
}

export default App;
