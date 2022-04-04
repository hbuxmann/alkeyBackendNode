let db = require("../../database/models");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Movie, {
        onDelete: 'CASCADE',
        as: "movies",
        through: "charactermovies",
        foreignKey: "characterId",
        otherKey: "movieId",
        timestamps: false
      })
      // this.hasOne(models.Genre);
      // this.hasOne(models.Genre, {
      //   as: "genres",
      //   foreignKey= "id"
      // })
    }
  }
  Character.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.DOUBLE,
    history: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};