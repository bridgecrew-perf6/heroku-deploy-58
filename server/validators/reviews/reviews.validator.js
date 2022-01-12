const { check, body, param, validationResult } = require("express-validator");

exports.validate_review = (method) => {
  switch (method) {
    case "create_new_review": {
      return [
        body("title", "Title doesn't exists.").exists().trim().escape(),
        body("description", "Description does not exist.").exists().escape().trim(),
      ];
    }
    case "get_review_by_id": {
      return [
        param("id", "Id doesn't exists.").exists().trim().escape(),
      ];
    }
    case "get_all_reviews_filtered": {
      return [
        
      ];
    }
    case "delete_review_by_id": {
      return [
        
      ];
    }
  }
};

