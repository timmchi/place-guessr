const User = require("./user");
const Game = require("./game");

// User.sync({ alter: true });
// Game.belongsTo(User);
// User.hasMany(Game);
User.hasMany(Game, { foreignKey: "player1_id", as: "gamesAsPlayer1" });
User.hasMany(Game, { foreignKey: "player2_id", as: "gamesAsPlayer2" });
User.hasMany(Game, { foreignKey: "winner_id", as: "gamesAsWinner" });

Game.belongsTo(User, { foreignKey: "player1_id", as: "player1" });
Game.belongsTo(User, { foreignKey: "player2_id", as: "player2" });
Game.belongsTo(User, { foreignKey: "winner_id", as: "winner" });

module.exports = {
  User,
  Game,
};
