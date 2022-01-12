const db = require("../../models");
const Op = db.Sequelize.Op;
const { Review } = db;
const { validationResult } = require("express-validator");

exports.get_all_reviews_filtered = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, minRating } = req.query;
  const condition = {};

  if (!errors.isEmpty()) {
    return res.status(422).json({
      meta: {
        http: 422,
        code: "get_all_reviews_filtered_422",
        error: true,
        errors: errors.array(),
        text: "Request: get_all_reviews_filtered failed.",
        more_info: "https://www.localhost:8080/get_all_reviews_filtered_422.pdf",
      },
      data: {},
    });
  }

  try {
    title ? (condition.title = { [Op.substring]: `%${title}%` }) : null;
    minRating ? (condition.rating = { [Op.gte]: minRating }) : null;

    const reviews = await  Review.findAll({
      where: condition,
    });

    return res.status(200).json({
      meta: {
        http: 200,
        code: "get_all_reviews_filtered_200",
        error: null,
        errors: null,
        text: "Request: get_all_reviews_filtered completed.",
        more_info: "https://www.localhost:8080/get_all_reviews_filtered_200.pdf",
      },
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        http: 500,
        code: "get_all_reviews_filtered_500",
        error: error.message,
        errors: errors.array(),
        text: "Request: get_all_reviews_filtered failed due to server error.",
        more_info: "https://www.localhost:8080/get_all_reviews_filtered_500.pdf",
      },
      data: {},
    });
  }
};
