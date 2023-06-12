const fetchCoordinates = async (lat, lon) => {
  const res = await fetch(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
  );
  if (res.status !== 200) throw new Error("Failed to fetch city");
  const data = await res.json();
  // const address = data.address;
  //   const name = `${cityName}, ${address.country_code.toUpperCase()}`;
  return data;
};

const fetchCity = async (city) => {
  const res = await fetch(`https://geocode.maps.co/search?q=${city}`);
  if (res.status !== 200) throw new Error("Failed to fetch city");
  const data = await res.json();
  const cities = data.filter((el) => el.class === "boundary");
  if (cities.length <= 0) return null;
  cities[0].name = cities[0].display_name.split(",")[0];
  return cities[0];
};

export { fetchCoordinates, fetchCity };
