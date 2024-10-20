const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

module.exports = {
  up: async ({ context: queryInterface }) => {
    // i need toa dd rounds field to the game, and also created_at

    await queryInterface.addColumn("games", "rounds", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("games", "created_at", {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
    });

    await queryInterface.addColumn("games", "updated_at", {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("games", "rounds");

    await queryInterface.removeColumn("games", "created_at");

    await queryInterface.removeColumn("games", "updated_at");
  },
};
