const { User } = require("../models");
const { SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
      req.token = authorization.substring(7);
    } catch (err) {
      return res.status(401).json({ error: "token invalid" });
    }
  }

  next();
};

module.exports = { requestLogger, tokenExtractor };
