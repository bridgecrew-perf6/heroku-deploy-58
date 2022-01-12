const { check, body, param, validationResult } = require("express-validator");

exports.validate_reservation = (method) => {
  switch (method) {
    case "create_new_reservation": {
      return [

      ];
    }
    case "delete_reservation_by_id": {
      return [

      ];
    }
    case "get_all_reservations_filtered": {
      return [

      ];
    }
    case "get_reservation_by_id": {
      return [

      ];
    }
    case "update_reservation_by_id": {
      return [

      ];
    }
  }
};

