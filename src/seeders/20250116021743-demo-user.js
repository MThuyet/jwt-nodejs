'use strict';

const user = require('../../model/models/user');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // hardcode dữ liệu mẫu vào db
    await queryInterface.bulkInsert(
      // hàm bulkInsert để insert nhiều row vào db cùng lúc
      'User',
      [
        {
          email: 'John Doe',
          password: '12345',
          username: 'fake1',
        },
        {
          email: 'John Doe2',
          password: '12345',
          username: 'fake2',
        },
        {
          email: 'John Doe3',
          password: '12345',
          username: 'fake3',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
