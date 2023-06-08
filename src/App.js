import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.2185&longitude=7.659&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=Europe%2FBerlin"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div className="App">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
