const gamesRouter = require("express").Router();
const User = require("../models/user");
const Game = require("../models/game");
const UserGames = require("../models/user_games");

// for now, this route will take care of handling the recording of single games
// vs games will most likely be recorded using events with socket
gamesRouter.post("/", async (req, res) => {
  // TODO - check if the person from frontend is allowed to save the game to the users profile
  // this means that the check will have to also account for the anonymous game where there will be no token provided

  console.log("request body", req.body);

  const { gameType, map, score, user: userData } = req.body.gameData;

  console.log(gameType, map, score, userData);
  if (!userData)
    return res.status(200).json({ message: "anonymous games are not saved" });

  const user = await User.findOne({ where: { username: userData.username } });

  if (!user) return res.status(404).json({ error: "user not found" });

  const createdGame = await Game.create({
    map,
    gameType,
    player1Score: Math.floor(score),
  });
  const createdUserGame = await UserGames.create({
    userId: user.id,
    gameId: createdGame.id,
  });

  // this is subject to change
  res.json({ createdGame, createdUserGame });
});

module.exports = gamesRouter;
