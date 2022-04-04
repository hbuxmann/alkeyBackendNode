'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('genres', [
      {
        image: 'Animation.png',
        name: 'Animation',
        createdAt: new Date(),
        updatedAt: new Date()        
       },
      {
        image: 'Horror.png',
        name: 'Horror',
        createdAt: new Date(),
        updatedAt: new Date()        
       },
       {
        image: 'Comedy.png',
        name: 'Comedy',
        createdAt: new Date(),
        updatedAt: new Date()        
       },
       {
        image: 'Thriller.png',
        name: 'Thriller',
        createdAt: new Date(),
        updatedAt: new Date()        
       },
       {
        image: 'Action.png',
        name: 'Action',
        createdAt: new Date(),
        updatedAt: new Date()        
       },       
       {
        image: 'Western.png',
        name: 'Western',
        createdAt: new Date(),
        updatedAt: new Date()        
       }

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
  },
}
