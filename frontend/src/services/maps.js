import axios from "axios";

const geonamesApiUrl = "/api/locations/geonames";
const geolistApiUrl = "/api/locations/geolist";

const getRandomLocation = async (apiType, region) => {
  try {
    if (apiType === "geonames") {
      const response = await axios.get(`${geonamesApiUrl}/${region}`);

      const { nearest } = response.data;

      // Sometimes geonames is not available and send back the xml which explains it is not available,
      // so we start dealing with the error here
      if (!nearest || !nearest.latt || !nearest.longt) {
        throw new Error("Invalid response format from geonames API");
      }

      const { latt, longt } = nearest;

      const place = { lat: Number(latt), lng: Number(longt) };

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
    throw error;
  }
};

export default { getRandomLocation };
