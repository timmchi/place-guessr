const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "avatar_name", {
      type: DataTypes.STRING,
      defaultValue: "cartoon-shibu",
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "avatar_name");
  },
};
