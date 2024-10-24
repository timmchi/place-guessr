import axios from "axios";
const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

const updateUser = async (userData) => {
  const config = {
    headers: { Authorization: token },
  };

  // we can put the username here as well
  const { id, selectedImage, username } = userData;

  const response = await axios.put(
    `${baseUrl}/${id}`,
    { avatarName: selectedImage, username },
    config
  );
  return response.data;
};

const deleteUser = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const createUser = async (userData) => {
  const response = await axios.post(baseUrl, userData);
  return response.data;
};

export default {
  setToken,
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
