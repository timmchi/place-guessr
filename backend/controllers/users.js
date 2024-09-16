const bcrypt = require("bcrypt");
const router = require("express").Router();

const { User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    username,
    email,
    passwordHash,
  });

  res.status(201).json(user);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) res.json(user);

  res.status(404).end();
});

module.exports = router;
