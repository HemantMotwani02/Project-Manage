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

    await queryInterface.bulkInsert('teams', [{
      project_id: 1,
      user_id:10,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      project_id: 1,
      user_id:11,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      project_id: 1,
      user_id:12,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      project_id: 1,
      user_id:13,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      project_id: 1,
      user_id:14,
      createdAt:new Date(),
      updatedAt:new Date()
    },
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
