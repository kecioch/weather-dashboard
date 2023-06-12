import { GeoAlt } from "react-bootstrap-icons";
import Input from "./Input";
import styles from "./SearchLocation.module.css";
import { useState } from "react";
import { fetchCity, fetchCoordinates } from "../services/GeoAPI";

const SearchLocation = ({ setLocation, setCoordinates }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fetchLocation = async () => {
    try {
      // Fetch city
      let city = await fetchCity(inputValue);
      if (!city) return;

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
      localStorage.setItem("coordinates", JSON.stringify(coord));
      localStorage.setItem("location", location);
    } catch (err) {
      console.log(err);
    }
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

  return (
    <Input
      id="location"
      placeholder="City"
      value={inputValue}
      onKeyDown={onKeyDown}
      onChange={onChange}
      loading={isFetching}
      className={styles.input}
    >
      <GeoAlt /> City
    </Input>
  );
};

export default SearchLocation;
