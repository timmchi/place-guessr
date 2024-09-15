const server = require("./app");
const { PORT } = require("./utils/config");

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
