const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("user_games", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "games", key: "id" },
      },
    });

    await queryInterface.removeColumn("games", "player1_id", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    });

    await queryInterface.removeColumn("games", "player2_id", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("user_games");

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
  },
};
