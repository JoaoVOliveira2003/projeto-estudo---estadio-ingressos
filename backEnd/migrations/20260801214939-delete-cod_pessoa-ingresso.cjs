"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("ingresso", "cod_pessoa");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("ingresso", "cod_pessoa", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};