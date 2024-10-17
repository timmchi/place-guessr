const bcrypt = require("bcrypt");
const router = require("express").Router();
const validationMiddleware = require("../utils/validationMiddleware");

const { User } = require("../models");

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

  const user = await User.findByPk(id);

  console.log("sending user back", user);
  // remove hash, email, also will need to add profile pic, game history
  if (user) res.json({ id: user.id, username: user.username });

  res.status(404).end();
});

module.exports = router;
