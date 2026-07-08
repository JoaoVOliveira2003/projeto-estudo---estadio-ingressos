'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ingresso', {
      cod_ingresso: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_evento: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'evento',
          key: 'cod_evento'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cod_assento: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'assento',
          key: 'cod_assento'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cod_pessoa: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'pessoa',
          key: 'cod_pessoa'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      preco: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      cod_status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'status',
          key: 'cod_status'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      data_compra: {
        allowNull: false,
        type: Sequelize.DATE
      },
      codigo_qrcode: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255)
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ingresso');
  }
};