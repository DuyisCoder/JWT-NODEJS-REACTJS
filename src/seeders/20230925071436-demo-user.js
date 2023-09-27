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
    //  User ở đây là user của migrations
    // => Giúp chúng ta tạo dữ liệu vào database bulkInsert chèn nhìu bảng ghi 1 lúc
    await queryInterface.bulkInsert('user', [
      {
        email: 'John Doe',
        password: '123',
        username: 'fake1',
      }, {
        email: 'John Doe2',
        password: '123',
        username: 'fake2',
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
