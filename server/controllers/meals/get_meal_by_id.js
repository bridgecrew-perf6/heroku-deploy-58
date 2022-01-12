const db = require("../../models");
const Op = db.Sequelize.Op;
const { Meal } = db;
const { validationResult } = require("express-validator");

exports.get_meal_by_id = async (req, res, next) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "get_meal_by_id_422",
        error: true,
        errors: errors.array(),
        text: "Request: get_meal_by_id failed.",
        more_info: "https://www.localhost:8080/get_meal_by_id_422.pdf",
      },
      data: {},
    });
  }

  try {
    const meal_by_id = await Meal.findByPk(id);

    if (meal_by_id) {
      return res.status(200).json({
        meta: {
          http: 200,
          code: "get_meal_by_id_200",
          error: null,
          errors: null,
          text: "Request: get_meal_by_id completed.",
          more_info: "https://www.localhost:8080/get_meal_by_id_200.pdf",
        },
        data: meal_by_id,
      });
    }

    return res.status(404).json({
      meta: {
        http: 404,
        code: "get_meal_by_id_404",
        error: true,
        errors: null,
        text: "Request: get_meal_by_id couldn't find any match.",
        more_info: "https://www.localhost:8080/get_meal_by_id_404.pdf",
      },
      data: {},
    });

  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "get_meal_by_id_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: get_meal_by_id failed due to server error.",
        more_info: "https://www.localhost:8080/get_all_meals_filtered_500.pdf",
      },
      data: {},
    });
  }
};

