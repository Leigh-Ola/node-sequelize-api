const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Comment = require("../controllers/comments.controller");
const { checkIdInput, checkIdExist } = require("../middleware/verify");

router.post(
  "/comment/:episode_id",
  [
    checkIdInput, // ID must be a valid integer
    checkIdExist, // comment must be associated with a valid ID matching a movie
    body("comment").isLength({ min: 5, max: 500 }), // comment must be between 5 to 500 chars long
  ],
  Comment.create
);

router.get(
  "/comments/:episode_id",
  [
    checkIdInput, // ID must be a valid integer
    checkIdExist, // comment must be associated with a valid ID matching a movie
  ],
  Comment.find
);

router.get("/comments", Comment.findAll);

router.delete(
  "/comments/:episode_id",
  [
    checkIdInput, // ID must be a valid integer
    checkIdExist, // comment must be associated with a valid ID matching a movie
  ],
  Comment.delete
);

//router.delete("/comments", Comment.delete);
module.exports = router;
