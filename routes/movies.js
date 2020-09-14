const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Movie = require("../controllers/movies.controller");
const { checkIdInput, checkIdExist } = require("../middleware/verify");

router.get("/movies", Movie.list);

module.exports = router;
