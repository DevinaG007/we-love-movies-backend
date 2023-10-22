const controller = require("./movies.controller");
const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/:movieId/theaters").get(controller.readWithTheaters).all(methodNotAllowed);
router.route("/:movieId/reviews").get(controller.listMoviesReviews).all(methodNotAllowed);

module.exports = router;