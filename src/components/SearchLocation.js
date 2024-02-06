import { Bullseye, GeoAlt } from "react-bootstrap-icons";
import Input from "./Input";
import styles from "./SearchLocation.module.css";
import { useRef, useState } from "react";
import { fetchCity, fetchCoordinates } from "../services/GeoAPI";
import { locateUser } from "../services/LocateUser";
import delay from "../services/Delay";

const SearchLocation = ({ setLocation, setCoordinates }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const setUserLocationRef = useRef();

  const fetchLocation = async () => {
    try {
      setError(false);
      // Fetch city
      let city = await fetchCity(inputValue);
      if (!city) return setError(true);

      // Wait delay because of geocode api restrictions
      await delay(1100);

      // Fetch country code from city
      const cityData = await fetchCoordinates(city.lat, city.lon);

      // Set coordinates & location
      const coord = {
        lat: cityData.lat,
        lon: cityData.lon,
      };
      const location = `${
        city.name
      }, ${cityData.address.country_code.toUpperCase()}`;
      setCoordinates(coord);
      setLocation(location);
      setInputValue("");
      setHasFocus(false);
      localStorage.setItem("coordinates", JSON.stringify(coord));
      localStorage.setItem("location", location);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const getUserLocation = async () => {
    try {
      setIsFetching("userLocation");
      const userLocation = await locateUser();
      setLocation(userLocation.location);
      setCoordinates(userLocation.coord);
      localStorage.setItem("coordinates", JSON.stringify(userLocation.coord));
      localStorage.setItem("location", userLocation.location);
      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onBlur = () => {
    setTimeout(() => setHasFocus(false), 200);
  };

  const onKeyDown = async (ev) => {
    if (ev.key !== "Enter" || isFetching) return;
    setIsFetching(true);
    await fetchLocation();
    setIsFetching(false);
  };

  const onChange = (ev) => {
    setInputValue(ev.target.value);
  };

  const classes = `${styles.input} ${error && styles.error}`;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Input
          id="location"
          placeholder="City"
          value={inputValue}
          onKeyDown={onKeyDown}
          onChange={onChange}
          loading={isFetching}
          className={classes}
          onFocus={() => setHasFocus(true)}
          onBlur={onBlur}
        >
          <GeoAlt /> City
        </Input>
        {navigator.geolocation && hasFocus && (
          <span
            className={styles.locateUser}
            aria-label="Current Location"
            title="Current Location"
            onClick={getUserLocation}
            ref={setUserLocationRef}
          >
            <Bullseye />
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchLocation;
