'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('setor', {
      cod_setor: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_estadio: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'estadio',
          key: 'cod_estadio'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      desc_setor: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('setor');
  }
};