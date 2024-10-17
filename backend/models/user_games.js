const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class UserGames extends Model {}

UserGames.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "games", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user_games",
  }
);

module.exports = UserGames;
