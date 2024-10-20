const bcrypt = require("bcrypt");
const router = require("express").Router();
const validationMiddleware = require("../utils/validationMiddleware");
const { tokenExtractor } = require("../middleware/middleware");

const { User, Game } = require("../models");

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

  // Reserved Guest user which will be used to account for anonymous players in duel mode
  if (Number(id) === 1)
    return res.status(400).json({ error: "not authorized" });

  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Game,
          as: "gamesAsWinner",
        },
        {
          model: Game,
          as: "games_played",
          through: {
            attributes: [],
          },
          include: [
            {
              model: User,
              as: "winner",
              attributes: ["id", "username"],
            },
          ],
        },
      ],
    });

    if (user) {
      // remove hash, email, also will need to add profile pic
      res.json({
        id: user.id,
        username: user.username,
        wonGames: user.gamesAsWinner,
        // playedGames: user.games_played,
        playedGames: user.games_played.map((game) => ({
          id: game.id,
          gameType: game.gameType,
          map: game.map,
          player1Score: game.player1Score,
          player2Score: game.player2Score,
          winner: {
            id: game.winner?.id, // Check if winner is available
            username: game.winner?.username, // Get the username of the winner
          },
        })),
        avatar: user.avatarName,
      });
    } else {
      res.status(404).end();
    }
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
