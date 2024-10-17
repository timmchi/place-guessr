const User = require("./user");
const Game = require("./game");
const UserGames = require("./user_games");

User.hasMany(Game, { foreignKey: "winner_id", as: "gamesAsWinner" });

Game.belongsTo(User, { foreignKey: "winner_id", as: "winner" });

User.belongsToMany(Game, { through: UserGames, as: "games_played" });
Game.belongsToMany(User, { through: UserGames, as: "game_players" });

module.exports = {
  User,
  Game,
  UserGames,
};
