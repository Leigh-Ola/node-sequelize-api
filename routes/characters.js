const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Character = require("../controllers/characters.controller");
const { checkIdInput, checkIdExist } = require("../middleware/verify");

router.get("/characters", Character.list);

module.exports = router;
