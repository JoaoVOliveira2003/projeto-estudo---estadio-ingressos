"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("estadio", "endereco");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("estadio", "endereco", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};