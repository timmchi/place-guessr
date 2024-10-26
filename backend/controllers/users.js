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

    res.json({
      id: user.id,
      username: user.username,
      wonGames: user.gamesAsWinner,
      totalGames,
      avatar: user.avatarName,
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

  const { avatarName, username } = req.body;

  if (user) {
    // user.username = req.body.username;
    // await user.save();
    // res.json(user);
    if (username) user.username = username;
    if (avatarName) user.avatarName = avatarName;
    await user.save();

    return res.json(user);
  }

  res.status(404).end();
});

router.delete("/:id", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) res.status(404).end();

  await user.destroy();

  return res.status(200).end();
});

module.exports = router;
