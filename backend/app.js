const express = require("express");
const { createServer } = require("node:http");
require("express-async-errors");
const { requestLogger } = require("./middleware/middleware");
const { unknownEndpoint } = require("./utils/utils");
const locationRouter = require("./controllers/locations");
const socketHandler = require("./sockets/socket");

const app = express();
const cors = require("cors");
const server = createServer(app);

socketHandler(server);

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/locations", locationRouter);

app.use(unknownEndpoint);

module.exports = server;
