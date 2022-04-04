'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [    
      {
        nickname: 'admin',
        user: 'admin@admin.com',
        password: '$2a$10$5R/M9F0a1hptZbp5lDZlY.y0ysEGcVwBCQ2B8KP0bepx7LcN4XIc.',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
