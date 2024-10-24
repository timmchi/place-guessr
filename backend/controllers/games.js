const gamesRouter = require("express").Router();
const User = require("../models/user");
const Game = require("../models/game");
const UserGames = require("../models/user_games");

const parseGameData = (game) => {
  return {
    id: game.id,
    gameType: game.gameType,
    map: game.map,
    player1Score: game.player1Score,
    player2Score: game.player2Score,
    winner: {
      id: game.winner?.id,
      username: game.winner?.username,
    },
    rounds: game.rounds,
    date: game.createdAt,
  };
};

// for now, this route will take care of handling the recording of single games
// vs games will most likely be recorded using events with socket
gamesRouter.post("/", async (req, res) => {
  // TODO - check if the person from frontend is allowed to save the game to the users profile
  // this means that the check will have to also account for the anonymous game where there will be no token provided

  console.log("request body", req.body);

  const { gameType, map, score, rounds, user: userData } = req.body.gameData;

  console.log(gameType, map, score, userData);
  if (!userData)
    return res.status(200).json({ message: "anonymous games are not saved" });

  const user = await User.findOne({ where: { username: userData.username } });

  if (!user) return res.status(404).json({ error: "user not found" });

  const createdGame = await Game.create({
    map,
    gameType,
    player1Score: Math.floor(score),
    rounds,
  });
  const createdUserGame = await UserGames.create({
    userId: user.id,
    gameId: createdGame.id,
  });

  // this is subject to change
  res.json({ createdGame, createdUserGame });
});

gamesRouter.get("/:userId", async (req, res) => {
  const limit = 5;

  const { userId } = req.params;

  const singleGamesPage = parseInt(req.query.singlePage) || 1;
  const singleGamesOffset = (singleGamesPage - 1) * limit;

  const duelGamesPage = parseInt(req.query.duelPage) || 1;
  const duelGamesOffset = (duelGamesPage - 1) * limit;

  const singleGames = await Game.findAll({
    include: [
      {
        model: User,
        as: "winner",
        attributes: ["id", "username"],
      },
      {
        model: User,
        as: "game_players",
        through: { attributes: [] },
        where: { id: userId },
      },
    ],
    where: { gameType: "SINGLE" },
    limit: limit,
    offset: singleGamesOffset,
    order: [["createdAt", "DESC"]],
  });

  const duelGames = await Game.findAll({
    include: [
      {
        model: User,
        as: "winner",
        attributes: ["id", "username"],
      },
      {
        model: User,
        as: "game_players",
        through: { attributes: [] },
        where: { id: userId },
      },
    ],
    where: { gameType: "DUEL" },
    limit: limit,
    offset: duelGamesOffset,
    order: [["createdAt", "DESC"]],
  });

  const totalSingleGames = await Game.count({
    include: {
      model: User,
      as: "game_players",
      through: { attributes: [] },
      where: { id: userId },
    },
    where: {
      gameType: "SINGLE",
    },
  });

  const totalDuelGames = await Game.count({
    include: {
      model: User,
      as: "game_players",
      through: { attributes: [] },
      where: { id: userId },
    },
    where: {
      gameType: "DUEL",
    },
  });

  res.json({
    singleGames: singleGames.map((game) => parseGameData(game)),
    duelGames: duelGames.map((game) => parseGameData(game)),
    totalSingleGames,
    totalDuelGames,
  });
});

module.exports = gamesRouter;
