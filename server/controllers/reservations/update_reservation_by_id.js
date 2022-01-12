const { Reservation } = require("../../models");
const { validationResult } = require("express-validator");

exports.update_reservation_by_id = async (req, res, next) => {
  const { seats_to_reserve, email, first_name, last_name, phone } = req.body;
  const { id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "update_reservation_by_id_422",
        error: true,
        errors: errors.array(),
        text: "Request: update_reservation_by_id failed.",
        more_info: "https://www.localhost:8080/update_reservation_by_id_422.pdf",
      },
      data: {},
    });
  }

  try {
    const reservation = {
      seats_to_reserve: seats_to_reserve,
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
    };

    const updated = await Reservation.update(reservation, {
      where: { id: id },
    });

    if (updated) {
      const updatedreservation = await Reservation.findOne({ where: { id: id } });
      return res.status(201).json({
        meta: {
          http: 201,
          code: "update_reservation_by_id_201",
          error: null,
          errors: null,
          text: "Request: update_reservation_by_id completed.",
          more_info: "https://www.localhost:8080/update_reservation_by_id_201.pdf",
        },
        data: updatedreservation,
      });
    }
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "update_reservation_by_id_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: update_reservation_by_id failed due to server error.",
        more_info: "https://www.localhost:8080/update_reservation_by_id_500.pdf",
      },
      data: {},
    });
  }
};
