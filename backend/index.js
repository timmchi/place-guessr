const server = require("./app");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

const start = async () => {
  await connectToDatabase();
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

start();
