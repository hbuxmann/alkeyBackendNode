'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('characters', [
      {
        image: 'jt.img',
        name: 'John Travolta',
        age: 10,
        weight: 55.4,
        history: 'bio in progress. Please ask later',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'slj.img',
        name: 'Samuel L Jackson',
        age: 50,
        weight: 85,
        history: 'bio in progress. Please ask later',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'th.img',
        name: 'Tom Hanks',
        age: 60,
        weight: 54,
        history: 'bio in progress. Please ask later',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'ta.img',
        name: 'Time Allen',
        age: 10,
        weight: 1,
        history: 'bio in progress. Please ask later',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'as.img',
        name: 'Arnold Schwarzenegger',
        age: 80,
        weight: 95,
        history: 'bio in progress. Please ask later',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'lh.img',
        name: 'Linda Hamilton',
        age: 65,
        weight: 65.9,
        history: 'bio in progress. Please ask later',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'ab.img',
        name: 'Albert Brooks',
        age: 32,
        weight: 78.2,
        history: 'bio in progress. Please ask later',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        image: 'ed.img',
        name: 'Ellen DeGeneres',
        age: 64,
        weight: 58.4,
        history: 'bio in progress. Please ask later',
        createdAt: new Date(),
        updatedAt: new Date()        
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('characters', null, {});
  }
};
