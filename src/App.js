import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import SearchLocation from "./components/SearchLocation";
import { fetchWeather } from "./services/WeatherAPI";
import { calcMsUntilNextHour } from "./services/Time";
import { locateUser } from "./services/LocateUser";

function App() {
  const [data, setData] = useState();
  const [timeZone] = useState("auto");
  const [coordinates, setCoordinates] = useState();
  const [location, setLocation] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();

  const initFallback = () => {
    setLocation("Lüdenscheid, DE");
    setCoordinates({ lat: 51.217989900000006, lon: 7.639170289221491 });
  };

  const fetchWeatherData = async () => {
    setIsFetching(true);
    try {
      const weatherData = await fetchWeather(
        coordinates.lat,
        coordinates.lon,
        timeZone
      );
      setData({ ...weatherData, location });
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    const initCoord = async () => {
      const loadedCoord = await JSON.parse(localStorage.getItem("coordinates"));
      const loadedLocation = localStorage.getItem("location");

      try {
        if (loadedCoord && loadedLocation) {
          setLocation(loadedLocation);
          setCoordinates(loadedCoord);
        } else if (navigator.geolocation) {
          const userLocation = await locateUser();
          setLocation(userLocation.location);
          setCoordinates(userLocation.coord);
          localStorage.setItem(
            "coordinates",
            JSON.stringify(userLocation.coord)
          );
          localStorage.setItem("location", userLocation.location);
        }
      } catch (err) {
        initFallback();
      }
    };
    initCoord();
  }, []);

  useEffect(() => {
    if (!coordinates || !timeZone) return;
    fetchWeatherData();

    const startInterval = () => {
      if (refreshInterval) clearTimeout(refreshInterval);
      const intervalCallback = () => {
        const newIntervalTime = calcMsUntilNextHour() + 10000;
        fetchWeatherData();
        setRefreshInterval(setTimeout(intervalCallback, newIntervalTime));
      };

      setRefreshInterval(setTimeout(intervalCallback, 0));
    };

    startInterval();

    return () => {
      clearTimeout(refreshInterval);
    };
  }, [coordinates, timeZone]);

  return (
    <div className="App">
      <SearchLocation
        setCoordinates={setCoordinates}
        setLocation={setLocation}
      />
      <Dashboard data={data} isLoading={isFetching || !data} />
    </div>
  );
}

export default App;
