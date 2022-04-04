'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    //
    await queryInterface.bulkInsert('movies', [
      {
        image: 'Finding Nemo',
        title: 'Finding Nemo',
        release_date: '2003-07-03',
        score: 10,
        genreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'Terminator',
        title: 'Terminator',
        release_date: '1984-10-24',
        score: 10,
        genreId: 5,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'Toy Story',
        title: 'Toy Story',
        release_date: '1995-11-19',
        score: 10,
        genreId: 1,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'Pulp Fiction',
        title: 'Pulp Fiction',
        release_date: '1994-10-14',
        score: 11,
        genreId: 5,
        createdAt: new Date(),
        updatedAt: new Date()        
      },

    ], {});
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('movies', null, {});
  }
};
