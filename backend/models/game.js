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
    // matters for single game only, hence why it will be null in vs game and not shown
    rounds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "game",
    timestamps: true,
  }
);

// well, if both players are anonymous, then the game is not recorded
// if one of them is anonymous, then record for the other player, and put the anonymous player as guest - but how to do that? One way is to assign a precreated Guest user, other way is to create a special GUEST type that can be assignable to player

module.exports = Game;
