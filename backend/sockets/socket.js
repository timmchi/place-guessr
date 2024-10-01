const { Server } = require("socket.io");
const axios = require("axios");
const { parseText } = require("../utils/geolistUtils");
const { generateRoomCode } = require("../utils/utils");
const geolist = "./geolist.txt";
const { haversine_distance, calculateScore } = require("../utils/scoreUtils");

const apiURL = "https://api.3geonames.org/?randomland";

const getLocation = async (apiType, region) => {
  if (apiType === "geolist") {
    try {
      const textByLine = parseText(geolist);

      const randomIndex = Math.trunc(Math.random() * textByLine.length);

      const randomPlace = textByLine[randomIndex];

      return randomPlace;
    } catch (error) {
      console.log(error);
    }
  }

  if (apiType === "geonames") {
    try {
      const { data } = await axios.get(`${apiURL}=${region}&json=1`);

      const { nearest } = data;
      const { latt, longt } = nearest;
      const randomPlace = { lat: Number(latt), lng: Number(longt) };

      return randomPlace;
    } catch (error) {
      console.log(error);
    }
  }
};

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
    connectionStateRecovery: {},
  });

  const users = [];
  let rooms = [];
  let roundAnswer;

  io.on("connection", (socket) => {
    console.log("user connected");

    users.push({ id: socket.id });

    socket.emit("hello");

    io.emit("users", users);

    socket.on("create room", (player) => {
      const roomId = generateRoomCode();
      socket.join(roomId);
      rooms = [
        ...rooms,
        {
          roomId: roomId,
          // keep track of room region here?
          player1: socket.id,
          player1ReadyToEnd: false,
          player2ReadyToEnd: false,
          player1ReadyToStart: false,
          player2ReadyToStart: false,
          player1RoundScore: 0,
          player2RoundScore: 0,
          player1Guess: null,
          player2Guess: null,
          player1Distance: null,
          player2Distance: null,
        },
      ];
      console.log("room created by", player, roomId);
      io.to(roomId).emit("room created", roomId);
    });

    socket.on("submit answer", (senderId, roomId, playerAnswer) => {
      console.log("player answer", playerAnswer);
      const distanceFromAnswerLocation = Math.floor(
        haversine_distance(playerAnswer, roundAnswer)
      );
      console.log("distance from location", distanceFromAnswerLocation);
      // min score is 1 so that 0 doesn't mess with the conditionals
      const roundScore = Math.max(
        Math.floor(calculateScore(distanceFromAnswerLocation)),
        1
      );

      console.log("round score", roundScore);

      const room = rooms.find((room) => room.roomId === roomId);

      if (room.player1 === senderId) {
        room.player1Distance = distanceFromAnswerLocation;
        room.player1RoundScore = roundScore;
      }

      if (room.player2 === senderId) {
        room.player2Distance = distanceFromAnswerLocation;
        room.player2RoundScore = roundScore;
      }

      if (room.player1RoundScore && room.player2RoundScore) {
        console.log(
          "both distances calculated, emitting distances set...",
          room.player1Distance,
          room.player2Distance
        );
        io.to(roomId).emit(
          "scores set",
          room.player1RoundScore,
          room.player1Distance,
          room.player2RoundScore,
          room.player2Distance
        );
      }

      //   io.emit("submit answer", distanceFromAnswerLocation, roundScore);
    });

    // emit from frontend when pano is set in frontend
    socket.on("panorama set", (location) => {
      roundAnswer = location;
    });

    socket.on("join room", (player, roomId) => {
      if (io.sockets.adapter.rooms.get(roomId)) {
        // console.log(`${player} joining ${roomId}`);
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

        // move this emit here instead of the room chosen event to avoid setting same room for all users on the site
        // io.to(roomId).emit("room chosen", room.region);
        console.log("room region in join room", room.region);

        io.to(roomId).emit("room joined", socket.id, roomId, room.region);
      }
    });

    socket.on("start game", (roomId) => {
      //   console.log("starting game in", roomId);
      io.to(roomId).emit("start game");
    });

    socket.on("end game", (roomId) => {
      //   console.log("ending game in", roomId);
      rooms = rooms.filter((room) => room.roomId === roomId);
      io.to(roomId).emit("end game");
    });

    socket.on("fetch location", async (apiType, region, roomId) => {
      //   console.log("fetching location for", apiType, region, roomId);
      const randomPlace = await getLocation(apiType, region);

      io.to(roomId).emit("fetched location", randomPlace);
    });

    socket.on("room chosen", (roomId, roomRegion) => {
      //   console.log("room chosen in", roomId, roomRegion);
      const room = rooms.find((r) => r.roomId === roomId);
      room.region = roomRegion;

      // this could lead to a problem where other users on the site will have their room state set to something they didnt sign up for
      //   io.emit("room chosen", roomRegion);
    });

    socket.on("end round", async (senderId, roomId) => {
      //     this might be required to check if a user is actually in a room
      //   const clients = await io.in(roomId).fetchSockets();
      //   const clientIds = clients.map((c) => c.id);
      const room = rooms.find((room) => room.roomId === roomId);

      if (room.player1 === senderId) room.player1ReadyToEnd = true;

      if (room.player2 === senderId) room.player2ReadyToEnd = true;

      if (room.player1ReadyToEnd && room.player2ReadyToEnd) {
        // socket.broadcast.to(roomId).emit("end round");
        io.to(roomId).emit("end round");
        room.player1ReadyToEnd = false;
        room.player2ReadyToEnd = false;
      }
    });

    socket.on("start round", async (senderId, roomId) => {
      //     this might be required to check if a user is actually in a room
      //   const clients = await io.in(roomId).fetchSockets();
      //   const clientIds = clients.map((c) => c.id);
      const room = rooms.find((room) => room.roomId === roomId);

      const apiType = room.region === "random" ? "geolist" : "geonames";

      if (room.player1 === senderId) room.player1ReadyToStart = true;

      if (room.player2 === senderId) room.player2ReadyToStart = true;

      if (room.player1ReadyToStart && room.player2ReadyToStart) {
        const randomLocation = await getLocation(apiType, room.region);

        // socket.broadcast.to(roomId).emit("start round", room.region, roomId);
        io.to(roomId).emit("start round", randomLocation, room.region, roomId);
        room.player1ReadyToStart = false;
        room.player2ReadyToStart = false;
        room.player1RoundScore = 0;
        room.player2RoundScore = 0;
        room.player1Guess = null;
        room.player2Guess = null;
        room.player1Distance = null;
        room.player2Distance = null;
        // roundAnswer = null;
      }
    });

    // socket.on("score calculated", async (senderId, roomId, score) => {
    //   const room = rooms.find((room) => room.roomId === roomId);

    //   if (room.player1 === senderId) {
    //     console.log("score of the first player is", score);
    //     room.player1RoundScore = score;
    //   }

    //   if (room.player2 === senderId) {
    //     console.log("score of the second player is", score);
    //     room.player2RoundScore = score;
    //   }

    //   if (room.player1RoundScore && room.player2RoundScore) {
    //     console.log("both scores calculated, emitting scores set...");
    //     io.to(roomId).emit(
    //       "scores set",
    //       room.player1RoundScore,
    //       room.player2RoundScore
    //     );
    //   }
    // });

    socket.on("guess sent", async (senderId, roomId, guess) => {
      const room = rooms.find((room) => room.roomId === roomId);

      if (room.player1 === senderId) {
        console.log("guess of the first player is", guess);
        room.player1Guess = guess;
      }

      if (room.player2 === senderId) {
        console.log("guess of the second player is", guess);
        room.player2Guess = guess;
      }

      if (room.player1Guess && room.player2Guess) {
        console.log("both guesses received, emitting guesses set...");
        io.to(roomId).emit("guesses set", room.player1Guess, room.player2Guess);
      }
    });

    socket.on("winner check", async (roomId, player1HP, player2HP) => {
      const room = rooms.find((room) => room.roomId === roomId);

      if (!room) return;

      console.log("checking winner, p1 hp, p2 hp", player1HP, player2HP);

      if (player1HP === 0) io.to(roomId).emit("game won", "p2");

      if (player2HP === 0) io.to(roomId).emit("game won", "p1");
    });

    socket.on("god reset", async (roomId) => {
      io.to(roomId).emit("god reset");
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
