const db = require("../../models");
const Op = db.Sequelize.Op;
const { Meal, Reservation } = db;
const { validationResult } = require("express-validator");

exports.get_all_reservations_by_meal_id = async (req, res, next) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "create_new_meal_422",
        error: true,
        errors: errors.array(),
        text: "Request: get_all_reservations_by_meal_id failed.",
        more_info: "https://www.localhost:8080/create_new_meal_422.pdf",
      },
      data: [],
    });
  }

  try {
    const all_reservations_by_meal_id = await Meal.findOne({
        where: { id: id },
        include: [
            {
                model: Reservation
            }
        ]
    });

    if (all_reservations_by_meal_id) {
      return res.status(200).json({
        meta: {
          http: 200,
          code: "get_all_reservations_by_meal_id_200",
          error: null,
          errors: null,
          text: "Request: get_all_reservations_by_meal_id completed.",
          more_info: "https://www.localhost:8080/get_all_reservations_by_meal_id_200.pdf",
        },
        data: all_reservations_by_meal_id,
      });
    }

    return res.status(404).json({
      meta: {
        http: 404,
        code: "get_all_reservations_by_meal_id_404",
        error: true,
        errors: null,
        text: "Request: get_all_reservations_by_meal_id couldn't find any match.",
        more_info: "https://www.localhost:8080/get_all_reservations_by_meal_id_404.pdf",
      },
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "get_all_reservations_by_meal_id_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: get_all_reservations_by_meal_id failed due to server error.",
        more_info: "https://www.localhost:8080/get_all_meals_filtered_500.pdf",
      },
      data: {},
    });
  }
};
