'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Character, {
        onDelete: 'CASCADE',
        as: "character",
        through: "charactermovies",
        foreignKey: "movieId",
        otherKey: "characterId",
        timestamps: false
      });
      this.belongsTo (models.Genre, {
        as: "genres",
        foreignKey: 'genreId'
        }
      );
    }
  }
  Movie.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    release_date: DataTypes.DATE,
    score: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};