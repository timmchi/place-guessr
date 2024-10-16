const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    await queryInterface.createTable("games", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      map: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      game_type: {
        type: DataTypes.ENUM("SINGLE", "DUEL"),
        allowNull: false,
      },
      player1_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player2_score: {
        type: DataTypes.INTEGER,
        allowNull: true, // will not exist in single player game
      },
    });

    await queryInterface.addColumn("games", "player1_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    });

    await queryInterface.addColumn("games", "player2_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    });

    await queryInterface.addColumn("games", "winner_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("games");
  },
};
