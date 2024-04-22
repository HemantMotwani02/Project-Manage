'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      name: 'user1',
      email: 'user1@gmail.com',
      password: '123',
      role: 'Super Admin',
      created_by: '11',
      updated_by: '11',
      deleted_at: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'user2',
      email: 'user2@gmail.com',
      password: '123',
      role: 'Manager',
      created_by: '12',
      updated_by: '12',
      deleted_at: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'user3',
      email: 'user4@gmail.com',
      password: '123',
      role: 'Employee',
      created_by: '13',
      updated_by: '13',
      deleted_at: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
},

  async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
};
