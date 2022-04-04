'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('charactermovies', [    
      {
        movieId: 1,
        characterId: 7,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        movieId: 1,
        characterId: 8,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        movieId: 2,
        characterId: 5,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        movieId: 2, 
        characterId: 6,
        createdAt: new Date(),
        updatedAt: new Date()        
      },      
      {
        movieId: 3,
        characterId: 3,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        movieId: 3,
        characterId: 4,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        movieId: 4,
        characterId: 1,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        movieId: 4, 
        characterId: 2,
        createdAt: new Date(),
        updatedAt: new Date()        
      },      

    ], {});
  }, 

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('charactermovies', null, {});
  }
};
