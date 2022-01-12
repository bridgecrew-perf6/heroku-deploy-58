const { check, body, param, validationResult } = require("express-validator");

exports.validate_meal = (method) => {
  switch (method) {
    case "create_new_meal": {
      return [
        body("title", "title doesn't exists")
          .exists()
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Missing title."),
        body("description", "description does not exist")
          .exists()
          .escape()
          .trim()
          .notEmpty()
          .withMessage("Missing description."),
        body("location", "location must be a string")
          .exists()
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Missing location."),
        body("price", "price must be a number")
          .exists()
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Missing price."),
        body("max_seats", "max_seats must be a number")
          .notEmpty()
          .withMessage("Missing number of seats.")
          .exists()
          .withMessage("You must provide this info.")
          .trim()
          .escape()
          .toInt(),
        body("date").exists().trim().escape().notEmpty().withMessage("Missing date."),
      ];
    }
    case "get_all_meals_filtered": {
      return [
        param("title").optional().trim().escape().isString().toLowerCase(),
        param("available_seats").optional().trim().escape(),
      ];
    }
    case "get_meal_by_id": {
      return [
        param("id").optional().trim().escape().toInt().isInt().withMessage("Id must be a number."),
      ];
    }
    case "delete_meal_by_id": {
      return [
        param("id").optional().trim().escape().toInt().isInt().withMessage("Id must be a number."),
      ];
    }
    case "get_all_reviews_by_meal_id": {
      return [
        param("id").optional().trim().escape().toInt().isInt().withMessage("Id must be a number."),
      ];
    }
    case "get_all_reservations_by_meal_id": {
      return [
        param("id").optional().trim().escape().toInt().isInt().withMessage("Id must be a number."),
      ];
    }
    case "update_meal_by_id": {
      return [
        param("id").optional().trim().escape().toInt().isInt().withMessage("Id must be a number."),
      ];
    }
  }
};
