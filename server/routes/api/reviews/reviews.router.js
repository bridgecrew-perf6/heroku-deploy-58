const router = require("express").Router();
const { validate_review } = require("../../../validators/reviews/reviews.validator");
const { create_new_review } = require("../../../controllers/reviews/create_new_review");
const { get_review_by_id } = require("../../../controllers/reviews/get_review_by_id");
const { get_all_reviews_filtered } = require("../../../controllers/reviews/get_all_reviews_filtered");
const { delete_review_by_id } = require("../../../controllers/reviews/delete_review_by_id");

router.get("/:id", validate_review("get_review_by_id"), get_review_by_id); // COMPLETED
router.get("/", validate_review("get_all_reviews_filtered"), get_all_reviews_filtered); // COMPLETED
router.post("/", validate_review("create_new_review"), create_new_review); // COMPLETED
router.delete("/:id", validate_review("delete_review_by_id"), delete_review_by_id); // COMPLETED

module.exports = router;
