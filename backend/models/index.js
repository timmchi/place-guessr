const User = require("./user");
const Game = require("./game");

// User.sync({ alter: true });
Game.belongsTo(User);
User.hasMany(Game);

module.exports = {
  User,
  Game,
};
