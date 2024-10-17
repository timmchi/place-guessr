import axios from "axios";
const baseUrl = "/api/games";

const saveSingleGame = async (gameData) => {
  console.log("userData", gameData);
  const response = await axios.post(baseUrl, { gameData });
  return response.data;
};

export default { saveSingleGame };
