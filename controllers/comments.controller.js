const express = require("express");
const { Comment } = require("../models");
const { validationResult } = require("express-validator");

exports.create = async (req, res) => {
  
  // Finds the validation errors in this request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      description:
        "Comment must have more than 5 characters and less than 500 characters"
    });
  }

  let comment = await Comment.create({
    comment: req.body.comment, // comment
    ip: req.ip, // request IP
    episode_id: parseInt(req.params.episode_id) // episode id
  });
  
  res.status(201).json({ description: "Your comment has been recorded" }); // response
};

exports.find = async (req, res) => {
  let { episode_id } = req.params;
  let comment = await Comment.findAll({
    where: { episode_id: parseInt(episode_id) } //,
    // order: [["createdAt", "DESC"]],
  });
  res.status(200).json(comment); // response
};

exports.findAll = async (req, res) => {
  let comments = await Comment.findAll({
    order: [["createdAt", "DESC"]]
  });
  res.status(200).json({ comments: comments }); // response
};

exports.delete = async (req, res) => {
  await Comment.destroy({
    where: { episode_id: parseInt(req.params.episode_id) }
  });
  res.status(200).json({ description: "Comments deleted successfully" });
};
