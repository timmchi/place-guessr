const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");
const validationMiddleware = require("../utils/validationMiddleware");

loginRouter.post("/", validationMiddleware.validateLogin, async (req, res) => {
  const { email, password } = req.parsedLoginData;

  const user = await User.findOne({ where: { email: email } });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect))
    return res.status(401).json({ error: "invalid username or password" });

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

  res
    .status(200)
    .send({
      token,
      username: user.username,
      id: user.id,
      avatarName: user.avatarName,
    });
});

module.exports = loginRouter;
