const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Game extends Model {}

// game will be recorded to db once the game ends, and games where all players are guests will not be recorded
Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    map: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameType: {
      type: DataTypes.ENUM("SINGLE", "DUEL"),
      allowNull: false,
    },
    player1Score: {
      type: DataTypes.INTEGER,
    },
    player2Score: {
      type: DataTypes.INTEGER,
      allowNull: true, // will not exist in single player game
    },
    winnerId: {
      type: DataTypes.INTEGER,
      // //   ???
      //   field: "winner_id",
      allowNull: true,
    },
    // player1: foreign key to user, allownull false - how to account for the fact that a player can be anonymous?
    // player2: foreign key to user, allownull true as there can be - how to account for the fact that a player can be anonymous?
    // player1 score
    // player2 score - optional for vs game only
    // winner - optional for vs game
  },
  {
    sequelize,
    underscored: true,
    modelName: "game",
    timestamps: false,
  }
);

// well, if both players are anonymous, then the game is not recorded
// if one of them is anonymous, then record for the other player, and put the anonymous player as guest - but how to do that? One way is to assign a precreated Guest user, other way is to create a special GUEST type that can be assignable to player

module.exports = Game;
