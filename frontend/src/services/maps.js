import axios from "axios";

const geonamesApiUrl = "http://localhost:3000/proxy";
const geolistApiUrl = "http://localhost:3000/geolist";

const getRandomLocation = async (apiType) => {
  try {
    if (apiType === "geonames") {
      const response = await axios.get(geonamesApiUrl);

      const { nearest } = response.data;
      const { latt, longt } = nearest;

      const place = { lat: latt, lng: longt };

      return place;
    }

    if (apiType === "geolist") {
      const response = await axios.get(geolistApiUrl);

      const place = response.data;

      return place;
    }

    throw new Error("Incorrect api apiType");
  } catch (error) {
    console.log("Error during location fetching", apiType, error);
  }
};

export default { getRandomLocation };
