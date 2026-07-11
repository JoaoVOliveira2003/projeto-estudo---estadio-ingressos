'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assento', {
      cod_assento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_setor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'setor',
          key: 'cod_setor'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fila: {
        allowNull: false,
        type: Sequelize.STRING(5)
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('assento');
  }
};