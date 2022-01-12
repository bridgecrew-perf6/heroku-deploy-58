const { Meal } = require("../../models");
const { validationResult } = require("express-validator");

exports.create_new_meal = async (req, res, next) => {
  const { title, description, location, price, max_seats, available_seats, date } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "create_new_meal_422",
        error: true,
        errors: errors.array(),
        text: "Request: create_new_meal failed.",
        more_info: "https://www.localhost:8080/create_new_meal_422.pdf",
      },
      data: {},
    });
  }

  try {
    const meal = {
      title: title,
      description: description,
      location: location,
      price: price,
      max_seats: max_seats,
      available_seats: max_seats,
      date: new Date(),
    };

    const newMeal = await Meal.create(meal);

    return res.status(201).json({
      meta: {
        http: 201,
        code: "create_new_meal_201",
        error: null,
        errors: null,
        text: "Request: create_new_meal completed.",
        more_info: "https://www.localhost:8080/create_new_meal_201.pdf",
      },
      data: newMeal,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "create_new_meal_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: create_new_meal failed due to server error.",
        more_info: "https://www.localhost:8080/create_new_meal_500.pdf",
      },
      data: {},
    });
  }
};
