'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('status', {
      cod_status: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc_status: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(30)
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('status');
  }
};