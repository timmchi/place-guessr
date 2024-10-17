const bcrypt = require("bcrypt");
const router = require("express").Router();
const validationMiddleware = require("../utils/validationMiddleware");

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
          as: "gamesAsPlayer1",
        },
        {
          model: Game,
          as: "gamesAsPlayer2",
        },
        {
          model: Game,
          as: "gamesAsWinner",
        },
      ],
    });

    console.log("sending user back", user);

    if (user) {
      // remove hash, email, also will need to add profile pic
      res.json({
        id: user.id,
        username: user.username,
        gamesAsPlayer1: user.gamesAsPlayer1,
        gamesAsPlayer2: user.gamesAsPlayer2,
        gamesAsWinner: user.gamesAsWinner,
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

module.exports = router;
