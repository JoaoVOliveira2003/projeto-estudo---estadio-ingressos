"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("assento", "numero");
  },

  async down(queryInterface, Sequelize) {
  await queryInterface.addColumn("assento", "numero", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};