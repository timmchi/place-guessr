const { Server } = require("socket.io");
const axios = require("axios");
const { parseText } = require("../utils/geolistUtils");
const { generateRoomCode } = require("../utils/utils");
const geolist = "./geolist.txt";

const apiURL = "https://api.3geonames.org/?randomland";

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  const users = [];
  let rooms = [];

  io.on("connection", (socket) => {
    console.log("user connected");

    users.push({ id: socket.id });

    socket.emit("hello");

    io.emit("users", users);

    socket.on("submit answer", (player, answer) => {
      console.log(player, answer);
      io.emit("submit answer", player, answer, socket.id);
    });

    socket.on("create room", (player) => {
      const roomId = generateRoomCode();
      socket.join(roomId);
      rooms = [
        ...rooms,
        {
          roomId: roomId,
          player1: socket.id,
          player1ReadyToEnd: false,
          player2ReadyToEnd: false,
          player1ReadyToStart: false,
          player2ReadyToStart: false,
        },
      ];
      console.log("room created by", player, roomId);
      io.to(roomId).emit("room created", roomId);
    });

    socket.on("join room", (player, roomId) => {
      if (io.sockets.adapter.rooms.get(roomId)) {
        console.log(`${player} joining ${roomId}`);
        const room = rooms.find((r) => r.roomId === roomId);

        if (room) {
          if (!room.player2) {
            room.player2 = socket.id;
            console.log(`${player} joining ${roomId} as player2`);
          } else {
            console.log(`Room ${roomId} already has two players`);
            return;
          }
        }

        socket.join(roomId);
        io.to(roomId).emit("room joined", socket.id, roomId);
      }
    });

    socket.on("start game", (roomId) => {
      console.log("starting game in", roomId);
      io.to(roomId).emit("start game");
    });

    socket.on("end game", (roomId) => {
      console.log("ending game in", roomId);
      rooms = rooms.filter((room) => room.roomId === roomId);
      io.to(roomId).emit("end game");
    });

    socket.on("fetch location", async (apiType, region, roomId) => {
      console.log("fetching location for", apiType, region, roomId);

      if (apiType === "geolist") {
        try {
          const textByLine = parseText(geolist);

          const randomIndex = Math.trunc(Math.random() * textByLine.length);

          const randomPlace = textByLine[randomIndex];

          io.to(roomId).emit("fetched location", randomPlace);
        } catch (error) {
          console.log(error);
        }
      }

      if (apiType === "geonames") {
        //   console.log("apitype = geonames, fetching here");
        try {
          const { data } = await axios.get(`${apiURL}=${region}&json=1`);
          console.log("data in geonames socket fetching", data);
          const { nearest } = data;
          const { latt, longt } = nearest;
          io.to(roomId).emit("fetched location", {
            lat: Number(latt),
            lng: Number(longt),
          });
        } catch (error) {
          console.log(error);
        }
      }
    });

    socket.on("submit answer", (senderId, roomId) => {
      console.log("answer submit by", senderId);

      // const clients = await io.in(roomId).fetchSockets();
      // const clientIds = clients.map((c) => c.id);

      // const unreadyClientId = clientIds.find(id => id !== senderId)

      // io.to(senderId).
      socket.broadcast.to(roomId).emit("submit answer", socket.id);
    });

    socket.on("room chosen", (roomId, roomRegion) => {
      console.log("room chosen in", roomId, roomRegion);
      const room = rooms.find((r) => r.roomId === roomId);
      room.region = roomRegion;

      io.emit("room chosen", roomRegion);
    });

    socket.on("end round", async (senderId, roomId) => {
      //     this might be required to check if a user is actually in a room
      //   const clients = await io.in(roomId).fetchSockets();
      //   const clientIds = clients.map((c) => c.id);
      const room = rooms.find((room) => room.roomId === roomId);

      if (room.player1 === senderId) room.player1ReadyToEnd = true;

      if (room.player2 === senderId) room.player2ReadyToEnd = true;

      if (room.player1ReadyToEnd && room.player2ReadyToEnd) {
        socket.broadcast.to(roomId).emit("end round");
        room.player1ReadyToEnd = false;
        room.player2ReadyToEnd = false;
      }
    });

    socket.on("start round", async (senderId, roomId) => {
      //     this might be required to check if a user is actually in a room
      //   const clients = await io.in(roomId).fetchSockets();
      //   const clientIds = clients.map((c) => c.id);
      const room = rooms.find((room) => room.roomId === roomId);

      if (room.player1 === senderId) room.player1ReadyToStart = true;

      if (room.player2 === senderId) room.player2ReadyToStart = true;

      if (room.player1ReadyToStart && room.player2ReadyToStart) {
        socket.broadcast.to(roomId).emit("start round", room.region, roomId);
        room.player1ReadyToStart = false;
        room.player2ReadyToStart = false;
      }
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
};

module.exports = socketHandler;
