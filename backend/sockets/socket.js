const { Server } = require("socket.io");
const axios = require("axios");
const { parseText } = require("../utils/geolistUtils");
const { generateRoomCode } = require("../utils/utils");
const geolist = "./geolist.txt";
const { haversine_distance, calculateScore } = require("../utils/scoreUtils");
const { v4: uuidv4 } = require("uuid");

const apiURL = "https://api.3geonames.org/?randomland";

const getLocation = async (apiType, region) => {
  console.log("getLocation log", apiType, region);

  if (apiType === "geolist") {
    try {
      const textByLine = parseText(geolist);

      const randomIndex = Math.trunc(Math.random() * textByLine.length);

      const randomPlace = textByLine[randomIndex];

      return randomPlace;
    } catch (error) {
      console.error(error);
    }
  }

  if (apiType === "geonames") {
    try {
      const { data } = await axios.get(`${apiURL}=${region}&json=1`);

      const { nearest } = data;
      // Sometimes geonames is not available and send back the xml which explains it is not available,
      // so we start dealing with the error here
      if (!nearest || !nearest.latt || !nearest.longt) {
        throw new Error("Invalid response format from geonames API");
      }

      const { latt, longt } = nearest;

      const place = { lat: Number(latt), lng: Number(longt) };

      return place;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

const users = [];
let rooms = [];

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      // no middlewares as of now but perhaps some will be added e.g. auth
      skipMiddlewares: true,
    },
  });

  //   const users = [];
  //   let rooms = [];
  let roundAnswer;

  io.on("connection", (socket) => {
    console.log("user connected");

    users.push({ id: socket.id });

    socket.emit("hello");

    io.emit("users", users);

    socket.on("create room", (playerSocket, playerObject) => {
      // ok then, if playerObject is null (user is guest - not logged in),
      // then we just assign them some random id which will be then emitted to the frontend,
      // set in the global state and then emitted back with guesses, so that we can identify
      // the user properly and continue the game properly

      let playerId;

      if (!playerObject) playerId = uuidv4();

      if (playerObject) playerId = playerObject.id;

      const roomId = generateRoomCode();
      socket.join(roomId);

      // I wonder if I should keep the playerObject information here?
      // It could prove useful if I decide to implement logic where u keep the same room when game ends
      rooms = [
        ...rooms,
        {
          roomId: roomId,
          // keep track of room region here?
          //   player1: socket.id,
          player1: playerId,
          player1Object: playerObject,
          player2Object: null,
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
      console.log("room created by", playerSocket, roomId);

      // same as in the join room but with p1 this time, aka room creator
      io.to(roomId).emit("player joined", "p1", playerObject);

      socket.emit("playerId set", playerId);

      io.to(roomId).emit("room created", roomId);
    });

    socket.on("submit answer", (senderId, roomId, playerAnswer, callback) => {
      console.log("player answer", playerAnswer);
      const distanceFromAnswerLocation = Math.floor(
        haversine_distance(playerAnswer, roundAnswer)
      );
      console.log("distance from location", distanceFromAnswerLocation);

      const isInRoom = socket.rooms.has(roomId);

      // If not in the room, join the room
      if (!isInRoom) {
        socket.join(roomId);
      }

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

      callback(true);
    });

    // emit from frontend when pano is set in frontend
    socket.on("panorama set", (location) => {
      roundAnswer = location;
    });

    socket.on("join room", (playerSocket, roomId, playerObject) => {
      if (io.sockets.adapter.rooms.get(roomId)) {
        const room = rooms.find((r) => r.roomId === roomId);

        let playerId;

        if (!playerObject) playerId = uuidv4();

        if (playerObject) playerId = playerObject.id;

        // playerObject is the actual player data
        if (room) {
          if (!room.player2) {
            // room.player2 = socket.id;
            room.player2 = playerId;
            room.player2Object = playerObject;
            console.log(`${playerSocket} joining ${roomId} as player2`);
          } else {
            console.log(`Room ${roomId} already has two players`);
            return;
          }
        }

        socket.join(roomId);

        console.log("room region in join room", room.region);

        // maybe we should have a separate event with the player object emitted here
        io.to(roomId).emit(
          "player joined",
          "p2",
          room.player1Object,
          room.player2Object
          //   playerId
        );

        socket.emit("playerId set", playerId);

        console.log("player1 id, player2 id", room.player1, room.player2);

        // this controls state on the frontend which is used to render proper room
        io.to(roomId).emit("room joined", socket.id, roomId, room.region);
      }
    });

    socket.on("start game", (roomId) => {
      //   console.log("starting game in", roomId);
      const room = rooms.find((r) => r.roomId === roomId);

      if (room.player1 && room.player2) io.to(roomId).emit("start game");
    });

    socket.on("end game", (roomId) => {
      // this event is now only used for backend cleanup instead of contrlling frontend

      if (!rooms.find((r) => r.id === roomId)) return;

      rooms = rooms.filter((room) => room.roomId === roomId);
      //   io.to(roomId).emit("end game");
    });

    // do we need to pass api type from frontend everywhere? Or could we pass it once
    // on room creation, and then have backend room object track it...
    socket.on("fetch location", async (apiType, region, roomId) => {
      console.log("fetch location event", apiType, region, roomId);
      try {
        const randomPlace = await getLocation(apiType, region);

        io.to(roomId).emit("fetched location", randomPlace);
      } catch (error) {
        io.to(roomId).emit("geonames error", { message: error.message });
      }
    });

    socket.on("room chosen", (roomId, roomRegion) => {
      //   console.log("room chosen in", roomId, roomRegion);
      const room = rooms.find((r) => r.roomId === roomId);
      room.region = roomRegion;
    });

    socket.on("end round", async (senderId, roomId) => {
      const room = rooms.find((room) => room.roomId === roomId);

      if (room.player1 === senderId) room.player1ReadyToEnd = true;

      if (room.player2 === senderId) room.player2ReadyToEnd = true;

      if (room.player1ReadyToEnd && room.player2ReadyToEnd) {
        if (!room.roundEnded) {
          io.to(roomId).emit("end round");
          room.roundEnded = true;
        }

        room.player1ReadyToEnd = false;
        room.player2ReadyToEnd = false;
      }
    });

    socket.on("start round", async (senderId, roomId) => {
      const room = rooms.find((room) => room.roomId === roomId);

      room.roundEnded = false;

      const apiType = room.region === "random" ? "geolist" : "geonames";

      if (room.player1 === senderId) room.player1ReadyToStart = true;

      if (room.player2 === senderId) room.player2ReadyToStart = true;

      if (room.player1ReadyToStart && room.player2ReadyToStart) {
        try {
          // this is where location is fetched everywhere except the start of the vs game
          // fetch location event is responsible for the location fetch that happens on the vs game start
          const randomLocation = await getLocation(apiType, room.region);

          // socket.broadcast.to(roomId).emit("start round", room.region, roomId);
          io.to(roomId).emit(
            "start round",
            randomLocation,
            room.region,
            roomId
          );
          room.player1ReadyToStart = false;
          room.player2ReadyToStart = false;
          room.player1RoundScore = 0;
          room.player2RoundScore = 0;
          room.player1Guess = null;
          room.player2Guess = null;
          room.player1Distance = null;
          room.player2Distance = null;
          // roundAnswer = null;
        } catch (error) {
          io.to(roomId).emit("geonames error", { message: error.message });
        }
      }
    });

    socket.on("guess sent", async (senderId, roomId, guess, callback) => {
      const room = rooms.find((room) => room.roomId === roomId);

      const isInRoom = socket.rooms.has(roomId);

      // If not in the room, join the room
      if (!isInRoom) {
        socket.join(roomId);
      }

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
      callback(true);
    });

    // check whether a winner has been declared, if so, ignore
    // will this cause problems for the second user?
    socket.on("winner check", async (roomId, player1HP, player2HP) => {
      const room = rooms.find((room) => room.roomId === roomId);

      if (!room) return;

      console.log("checking winner, p1 hp, p2 hp", player1HP, player2HP);

      if (player1HP === 0) {
        if (!room.hasWinner) {
          io.to(roomId).emit("game won", "p2");
          room.hasWinner = true;
        }
      }

      if (player2HP === 0) {
        if (!room.hasWinner) {
          io.to(roomId).emit("game won", "p1");
          room.hasWinner = true;
        }
      }
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
