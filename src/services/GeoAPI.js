const fetchCoordinates = async (lat, lon) => {
  const res = await fetch(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=65c149e715790902207251uhgd7aa4f`
  );
  if (res.status !== 200) throw new Error("Failed to fetch city");
  const data = await res.json();
  return data;
};

const fetchCity = async (city) => {
  const res = await fetch(
    `https://geocode.maps.co/search?q=${city}&api_key=65c149e715790902207251uhgd7aa4f`
  );
  if (res.status !== 200) throw new Error("Failed to fetch city");
  const data = await res.json();
  const cities = data.filter((el) => el.class === "boundary");
  if (cities.length <= 0) return null;
  cities[0].name = cities[0].display_name.split(",")[0];
  return cities[0];
};

export { fetchCoordinates, fetchCity };
