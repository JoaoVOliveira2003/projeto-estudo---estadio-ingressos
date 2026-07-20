"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("setor", "fileiras", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("setor", "assentos", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("setor", "fileiras");
    await queryInterface.removeColumn("setor", "assentos");
  },
};
