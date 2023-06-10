import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import SearchLocation from "./components/SearchLocation";

function App() {
  const dateOptions = Intl.DateTimeFormat().resolvedOptions();
  const [data, setData] = useState();
  const [timeZone] = useState("auto"); //dateOptions.timeZone
  const [coordinates, setCoordinates] = useState({ lat: 51.2185, lon: 7.659 });
  const [location, setLocation] = useState("Lüdenscheid");

  useEffect(() => {
    if (!coordinates || !timeZone) return;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=${timeZone}`
    ).then(async (res) => {
      if (res.status !== 200) return;
      const data = await res.json();
      console.log(data);
      setData({ ...data, location });
    });
  }, [coordinates, timeZone, location]);

  return (
    <div className="App">
      <SearchLocation
        setCoordinates={setCoordinates}
        setLocation={setLocation}
      />
      <Dashboard data={data} />
    </div>
  );
}

export default App;
