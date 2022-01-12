const { Reservation } = require("../../models");
const { validationResult } = require("express-validator");

exports.create_new_reservation = async (req, res, next) => {
  const { first_name, last_name, email, phone, seats_to_reserve, mealId } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "create_new_reservation_422",
        error: true,
        errors: errors.array(),
        text: "Request: create_new_reservation failed.",
        more_info: "https://www.localhost:8080/create_new_reservation_422.pdf",
      },
      data: {},
    });
  }

  try {
    const reservation = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      seats_to_reserve : seats_to_reserve,
      mealId: mealId
    };

    const newReservation = await Reservation.create(reservation);

    return res.status(201).json({
      meta: {
        http: 201,
        code: "create_new_reservation_201",
        error: null,
        errors: null,
        text: "Request: create_new_reservation completed.",
        more_info: "https://www.localhost:8080/create_new_reservation_201.pdf",
      },
      data: newReservation,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "create_new_reservation_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: create_new_reservation failed due to server error.",
        more_info: "https://www.localhost:8080/create_new_reservation_500.pdf",
      },
      data: {},
    });
  }
};
