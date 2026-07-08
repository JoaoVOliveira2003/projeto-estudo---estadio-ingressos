'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pessoa', {
      cod_pessoa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(150)
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      cpf: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(11)
      },
      telefone: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      data_nascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('pessoa');
  }
};