const express = require("express");
const axios = require("axios");
const { createServer } = require("node:http");
require("express-async-errors");
const { requestLogger } = require("./middleware/middleware");
const { parseText } = require("./utils/geolistUtils");
const { unknownEndpoint } = require("./utils/utils");
const { Server } = require("socket.io");
const locationRouter = require("./controllers/locations");
const geolist = "./geolist.txt";

const apiURL = "https://api.3geonames.org/?randomland";

const app = express();
const cors = require("cors");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const users = [];

io.on("connection", (socket) => {
  console.log("user connected");

  users.push({ id: socket.id });

  socket.emit("hello");

  io.emit("users", users);

  socket.on("submit answer", (player, answer) => {
    console.log(player, answer);
    io.emit("submit answer", player, answer, socket.id);
  });

  socket.on("join room", (player, roomId) => {
    console.log(`${player} joining ${roomId}`);
    socket.join(roomId);
    io.to(roomId).emit("room joined", socket.id, roomId);
  });

  socket.on("start game", (roomId) => {
    console.log("starting game in", roomId);
    io.to(roomId).emit("start game");
  });

  socket.on("end game", (roomId) => {
    console.log("ending game in", roomId);
    io.to(roomId).emit("end game");
  });

  socket.on("fetch location", async (apiType, region, roomId) => {
    console.log("fetching location for", apiType, region, roomId);

    if (apiType === "geolist") {
      const textByLine = parseText(geolist);

      const randomIndex = Math.trunc(Math.random() * textByLine.length);

      const randomPlace = textByLine[randomIndex];

      io.to(roomId).emit("fetched location", randomPlace);
    }

    if (apiType === "geonames") {
      //   console.log("apitype = geonames, fetching here");
      const { data } = await axios.get(`${apiURL}=${region}&json=1`);
      console.log("data in geonames socket fetching", data);
      const { nearest } = data;
      const { latt, longt } = nearest;
      io.to(roomId).emit("fetched location", {
        lat: Number(latt),
        lng: Number(longt),
      });
    }
  });

  socket.on("submit answer", async (senderId, roomId) => {
    console.log("answer submit by", senderId);

    // const clients = await io.in(roomId).fetchSockets();
    // const clientIds = clients.map((c) => c.id);

    // const unreadyClientId = clientIds.find(id => id !== senderId)

    // io.to(senderId).
    io.to(roomId).except(socket.id).emit("submit answer", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    users.splice(
      users.findIndex((u) => u.id === socket.id),
      1
    );
    io.emit("users", users);
  });
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/locations", locationRouter);

app.use(unknownEndpoint);

module.exports = server;
