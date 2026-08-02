'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status', [
      {
        cod_status: 2,
        desc_status: 'Pendente',
      },
      {
        cod_status: 3,
        desc_status: 'Aprovado',
      },
      {
        cod_status: 4,
        desc_status: 'Rejeitado',
      },
      {
        cod_status: 5,
        desc_status: 'Cancelado',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status', {
      cod_status: [2, 3, 4, 5],
    }, {});
  }
};