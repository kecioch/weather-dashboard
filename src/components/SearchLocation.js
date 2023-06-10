import { GeoAlt } from "react-bootstrap-icons";
import Input from "./Input";
import styles from "./SearchLocation.module.css";
import { useState } from "react";

const SearchLocation = ({ setLocation, setCoordinates }) => {
  const [inputValue, setInputValue] = useState("");

  const fetchLocation = async () => {
    try {
      // Fetch city
      let res = await fetch(`https://geocode.maps.co/search?q=${inputValue}`);
      if (res.status !== 200) return;
      let data = await res.json();
      let cities = data.filter((el) => el.class === "boundary");
      if (cities.length <= 0) return;
      const city = cities[0];
      const cityName = city.display_name.split(",")[0];

      // Fetch country code from city
      res = await fetch(
        `https://geocode.maps.co/reverse?lat=${city.lat}&lon=${city.lon}`
      );
      if (res.status !== 200) return;
      data = await res.json();

      // Set coordinates & location
      setCoordinates({
        lat: data.lat,
        lon: data.lon,
      });
      setLocation(`${cityName}, ${data.address.country_code.toUpperCase()}`);
      setInputValue("");
    } catch (err) {
      console.log(err);
    }
  };

  const onKeyDown = async (ev) => {
    if (ev.key !== "Enter") return;
    fetchLocation();
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
    >
      <GeoAlt /> City
    </Input>
  );
};

export default SearchLocation;
