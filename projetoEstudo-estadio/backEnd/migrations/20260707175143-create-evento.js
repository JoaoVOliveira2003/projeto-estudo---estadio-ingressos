'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('evento', {
      cod_evento: {
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
      desc_evento: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      descricao: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      data_evento: {
        allowNull: false,
        type: Sequelize.DATE
      },
      maioridade_obrigatoria: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('evento');
  }
};