const { Meal } = require("../../models");
const { validationResult } = require("express-validator");

exports.update_meal_by_id = async (req, res, next) => {
  const { title, description, location, price, max_seats, available_seats, date } = req.body;
  const { id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "update_meal_by_id_422",
        error: true,
        errors: errors.array(),
        text: "Request: update_meal_by_id failed.",
        more_info: "https://www.localhost:8080/update_meal_by_id_422.pdf",
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
      available_seats: available_seats,
      date: date,
    };

    const updated = await Meal.update(meal, {
      where: { id: id },
    });

    if (updated) {
      const updatedMeal = await Meal.findOne({ where: { id: id } });
      return res.status(201).json({
        meta: {
          http: 201,
          code: "update_meal_by_id_201",
          error: null,
          errors: null,
          text: "Request: update_meal_by_id completed.",
          more_info: "https://www.localhost:8080/update_meal_by_id_201.pdf",
        },
        data: updatedMeal,
      });
    }
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "update_meal_by_id_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: update_meal_by_id failed due to server error.",
        more_info: "https://www.localhost:8080/update_meal_by_id_500.pdf",
      },
      data: {},
    });
  }
};
