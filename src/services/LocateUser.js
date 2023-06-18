import { fetchCoordinates } from "./GeoAPI";

const locateUser = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        try {
          const cityData = await fetchCoordinates(lat, lon);
          resolve({
            location: cityData.display_name,
            coord: { lat, lon },
          });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        console.log("Geolocation error:", error);
        reject(error);
      }
    );
  });
};

export { locateUser };
