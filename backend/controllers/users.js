const bcrypt = require("bcrypt");
const router = require("express").Router();
const validationMiddleware = require("../utils/validationMiddleware");
const { tokenExtractor } = require("../middleware/middleware");
const { Op } = require("sequelize");

const { User, Game, UserGames } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post(
  "/",
  validationMiddleware.validateRegistration,
  async (req, res) => {
    const { username, email, password } = req.parsedCredentials;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      email,
      passwordHash,
    });

    res.status(201).json(user);
  }
);

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log("body in get user", req.query);

  // Reserved Guest user which will be used to account for anonymous players in duel mode
  if (Number(id) === 1)
    return res.status(400).json({ error: "not authorized" });

  const singleGamesPage = parseInt(req.query.singlePage) || 1;
  const limit = 5;
  const singleGamesOffset = (singleGamesPage - 1) * limit;

  const duelGamesPage = parseInt(req.query.duelPage) || 1;
  const duelGamesOffset = (duelGamesPage - 1) * limit;

  console.log(
    "singlePage, duelPage in backend",
    singleGamesPage,
    duelGamesPage
  );

  // seems like all of this is too large, a refactor is in order
  try {
    const totalGames = await UserGames.count({
      where: { userId: id },
    });

    // We do separate queries here instead of join because sequelize doesnt properly support limiting and offseting many to many relationships
    const user = await User.findByPk(id, {
      include: [
        {
          model: Game,
          as: "gamesAsWinner",
        },
      ],
    });

    if (!user) res.status(404).end();

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
          where: { id },
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
          where: { id },
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
        where: { id: id },
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
        where: { id: id },
      },
      where: {
        gameType: "DUEL",
      },
    });

    // remove hash, email, also will need to add profile pic
    res.json({
      id: user.id,
      username: user.username,
      wonGames: user.gamesAsWinner,
      totalGames,
      singleGames: singleGames.map((game) => ({
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
      })),
      duelGames: duelGames.map((game) => ({
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
      })),
      avatar: user.avatarName,
      singleGamesPage,
      duelGamesPage,
      totalSingleGames,
      totalDuelGames,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data." });
  }
});

// this will need to be fixed so that everyhting else can be updated as well
router.put("/:id", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.params.id);

  const { avatarName } = req.body;

  if (user) {
    // user.username = req.body.username;
    // await user.save();
    // res.json(user);
    user.avatarName = avatarName;
    await user.save();

    return res.json(user);
  }

  res.status(404).end();
});

module.exports = router;
