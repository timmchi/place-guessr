const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const generateRoomCode = () => {
  const symbols =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    result += symbols[randomIndex];
  }

  return result;
};

module.exports = { unknownEndpoint, generateRoomCode };
