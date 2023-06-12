import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import SearchLocation from "./components/SearchLocation";
import { fetchCoordinates } from "./services/GeoAPI";

function App() {
  const [data, setData] = useState();
  const [timeZone] = useState("auto");
  const [coordinates, setCoordinates] = useState();
  const [location, setLocation] = useState();

  const initFallback = () => {
    setLocation("Lüdenscheid, DE");
    setCoordinates({ lat: 51.217989900000006, lon: 7.639170289221491 });
  };

  useEffect(() => {
    const initCoord = async () => {
      const loadedCoord = await JSON.parse(localStorage.getItem("coordinates"));
      const loadedLocation = localStorage.getItem("location");

      if (loadedCoord && loadedLocation) {
        setLocation(loadedLocation);
        setCoordinates(loadedCoord);
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude: lat, longitude: lon } = position.coords;
            const cityData = await fetchCoordinates(lat, lon);
            setLocation(cityData.display_name);
            setCoordinates({ lat, lon });
          },
          (error) => {
            console.log("Geolocation error:", error);
            initFallback();
          }
        );
      } else {
        initFallback();
      }
    };
    initCoord();
  }, []);

  useEffect(() => {
    if (!coordinates || !timeZone) return;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=${timeZone}`
    ).then(async (res) => {
      if (res.status !== 200) return;
      const data = await res.json();
      setData({ ...data, location });
    });
  }, [coordinates, timeZone]);

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
