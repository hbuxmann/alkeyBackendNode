'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      image: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(70),
        unique: true,
        allowNull: false
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'genres',
            // schema: 'disney_db'
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};