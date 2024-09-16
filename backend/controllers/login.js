const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const validationMiddleware = require("../utils/validationMiddleware");
const config = require("../utils/config");
const { response } = require("express");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect))
    return response.status(401).json({ error: "invalid username or password" });

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

  response.status(200).send({ token, username: user.username, id: user.id });
});

module.exports = loginRouter;
