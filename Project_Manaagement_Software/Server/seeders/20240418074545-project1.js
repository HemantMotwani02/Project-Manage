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

    await queryInterface.bulkInsert('Projects', [
      {
        manager_Id: 2,
        project_name: 'Banking Software',
        project_details: 'Creating a Web Portal for a Private Bank',
        created_by: 2,
        updated_by: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manager_Id: 2,
        project_name: 'Project Management Software',
        project_details: 'A web portal for managing projects',
        created_by: 2,
        updated_by: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        manager_Id: 2,
        project_name: 'Tourist Guide Application',
        project_details: 'Mobile Application which helps the travelers to explore the new places',
        created_by: 2,
        updated_by: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
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
