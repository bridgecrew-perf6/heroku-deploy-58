const db = require("../../models");
const Op = db.Sequelize.Op;
const { Meal } = db;
const { validationResult } = require("express-validator");

exports.get_all_meals_filtered = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, location, maxPrice, available_seats, dateBefore, dateAfter, limit } = req.query;
  const condition = {};

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "create_new_meal_422",
        error: true,
        errors: errors.array(),
        text: "Request: get_all_meals_filtered failed.",
        more_info: "https://www.localhost:8080/create_new_meal_422.pdf",
      },
      data: {},
    });
  }

  try {
    title ? (condition.title = { [Op.substring]: `%${title}%` }) : null;
    location ? (condition.location = { [Op.substring]: `%${location}%` }) : null;
    maxPrice ? (condition.price = { [Op.lte]: maxPrice }) : null;
    available_seats ? (condition.available_seats = { [Op.gte]: available_seats }) : null;
    dateBefore ? (condition.date = { [Op.lte]: dateBefore }) : null;
    dateAfter ? (condition.date = { [Op.gte]: dateAfter }) : null;

    const meals = await Meal.findAll({
      where: condition,
      limit: limit,
    });

    return res.status(200).json({
      meta: {
        http: 200,
        code: "get_all_meals_filtered_200",
        error: null,
        errors: null,
        text: "Request: get_all_meals_filtered completed.",
        more_info: "https://www.localhost:8080/get_all_meals_filtered_200.pdf",
      },
      data: meals,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "get_all_meals_filtered_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: get_all_meals_filtered failed due to server error.",
        more_info: "https://www.localhost:8080/get_all_meals_filtered_500.pdf",
      },
      data: {},
    });
  }
};
