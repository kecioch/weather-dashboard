const fetchWeather = async (lat, lon, timezone) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,windspeed_10m,uv_index,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=${timezone}`
  );
  if (res.status !== 200) throw new Error("Failed to fetch weather data");
  const data = await res.json();
  return data;
};

export { fetchWeather };
