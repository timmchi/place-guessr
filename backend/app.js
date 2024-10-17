const express = require("express");
const { createServer } = require("node:http");
require("express-async-errors");
const { requestLogger, errorHandler } = require("./middleware/middleware");
const { unknownEndpoint } = require("./utils/utils");
const locationRouter = require("./controllers/locations");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const gamesRouter = require("./controllers/games");
const socketHandler = require("./sockets/socket");

const app = express();
const cors = require("cors");
const server = createServer(app);

socketHandler(server);

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(express.static("dist"));

app.use("/api/locations", locationRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/games", gamesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = server;
