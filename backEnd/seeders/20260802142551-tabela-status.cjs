module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status', [
      { cod_status: 1, desc_status: 'Disponível' },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status', null, {})
  }
}