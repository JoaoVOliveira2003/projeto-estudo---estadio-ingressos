"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("setor", "cor_setor");
    await queryInterface.removeColumn("setor", "capacidade");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("setor", "cor_setor", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  await queryInterface.addColumn("setor", "capacidade", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};