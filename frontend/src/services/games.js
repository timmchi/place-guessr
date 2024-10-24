import axios from "axios";
const baseUrl = "/api/games";

const saveSingleGame = async (gameData) => {
  console.log("userData", gameData);
  const response = await axios.post(baseUrl, { gameData });
  return response.data;
};

const getUsersGames = async (userId, singlePage, duelPage) => {
  const params = {
    singlePage,
    duelPage,
  };

  const response = await axios.get(`${baseUrl}/${userId}`, { params });
  return response.data;
};

export default { saveSingleGame, getUsersGames };
