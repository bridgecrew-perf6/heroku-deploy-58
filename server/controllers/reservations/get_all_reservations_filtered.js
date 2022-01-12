const db = require("../../models");
const Op = db.Sequelize.Op;
const { Reservation } = db;
const { validationResult } = require("express-validator");

exports.get_all_reservations_filtered = async (req, res, next) => {
  const errors = validationResult(req);
  const { first_name, last_name, email, phone, mealId, seats_to_reserve } = req.query;
  const condition = {};

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "get_all_reservations_filtered_422",
        error: true,
        errors: errors.array(),
        text: "Request: get_all_reservation_filtered failed.",
        more_info: "https://www.localhost:8080/get_all_reservations_filtered_422.pdf",
      },
      data: {},
    });
  }

  try {
    first_name ? (condition.first_name = { [Op.substring]: `%${first_name}%` }) : null;
    last_name ? (condition.last_name = { [Op.substring]: `%${last_name}%` }) : null;
    email ? (condition.email = { [Op.substring]: `%${email}%` }) : null;

    const reservations = await Reservation.findAll({
      where: condition,
    });

    return res.status(200).json({
      meta: {
        http: 200,
        code: "get_all_reservation_filtered_200",
        error: null,
        errors: null,
        text: "Request: get_all_reservation_filtered completed.",
        more_info: "https://www.localhost:8080/get_all_reservations_filtered_200.pdf",
      },
      data: reservations,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "get_all_reservations_filtered_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: get_all_reservations_filtered failed due to server error.",
        more_info: "https://www.localhost:8080/get_all_reservations_filtered_500.pdf",
      },
      data: {},
    });
  }
};
