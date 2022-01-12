const { Review } = require("../../models");
const { validationResult } = require("express-validator");

exports.create_new_review = async (req, res, next) => {
  const { title, description, rating, mealId } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "create_new_review_422",
        error: true,
        errors: errors.array(),
        text: "Request: create_new_review failed.",
        more_info: "https://www.localhost:8080/create_new_review_422.pdf",
      },
      data: {},
    });
  }

  try {
    const review = {
      title: title,
      description: description,
      rating: rating,
      mealId: mealId
    };

    const newReview = await Review.create(review);

    return res.status(201).json({
      meta: {
        http: 201,
        code: "create_new_review_201",
        error: null,
        errors: null,
        text: "Request: create_new_review completed.",
        more_info: "https://www.localhost:8080/create_new_review_201.pdf",
      },
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "create_new_review_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: create_new_review failed due to server error.",
        more_info: "https://www.localhost:8080/create_new_review_500.pdf",
      },
      data: {},
    });
  }
};
