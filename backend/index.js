const express = require("express");
const axios = require("axios");
const { readFileSync } = require("fs");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const cors = require("cors");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const port = 3000;

const apiURL = "https://api.3geonames.org/?randomland";

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

  socket.on("disconnect", () => {
    console.log("user disconnected");

    users.splice(
      users.findIndex((u) => u.id === socket.id),
      1
    );
    io.emit("users", users);
  });
});

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/geolist", (req, res) => {
  try {
    const text = readFileSync("./geolist.txt").toString("utf-8");
    const textByLine = text.split("\n").map((line) => {
      const [lat, lng] = line.split(" ").map(Number);
      return { lat, lng };
    });

    const randomIndex = Math.trunc(Math.random() * textByLine.length + 1);

    const randomPlace = textByLine[randomIndex];

    res.json(randomPlace);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/proxy/:region", async (req, res) => {
  try {
    const { region } = req.params;
    // const region = "FR";
    const response = await axios.get(`${apiURL}=${region}&json=1`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.use(unknownEndpoint);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
