"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meal.hasMany(models.Review, {
        foreignKey: "mealId",
      }),
        Meal.hasMany(models.Reservation, {
          foreignKey: "mealId",
        });
        
    }
  }
  Meal.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      location: DataTypes.STRING,
      price: DataTypes.INTEGER,
      max_seats: DataTypes.INTEGER,
      available_seats: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Meal",
    },
  );
  return Meal;
}; 