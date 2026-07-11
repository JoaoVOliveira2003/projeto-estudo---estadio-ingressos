'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estadio', {
      cod_estadio: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc_estadio: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      // endereco: {
      //   allowNull: false,
      //   type: Sequelize.STRING(255)
      // }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('estadio');
  }
};