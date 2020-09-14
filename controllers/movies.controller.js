const axios = require("axios");
const express = require("express");
const { Comment } = require("../models");
const { validationResult } = require("express-validator");

exports.list = (req, res) => {
  axios
    .get("https://swapi.dev/api/films")
    .then(async films => {
      let news = await Promise.all(
        films.data.results.map(async o => {
          let news = {
            title: o.title,
            opening_crawl: o.opening_crawl,
            release_date: o.release_date,
            episode_id: o.episode_id,
            commment_count: await Comment.count({
              where: { episode_id: o.episode_id }
            }),
            comments: await Comment.findAll({
              where: { episode_id: o.episode_id },
              order: [["createdAt", "DESC"]]
            })
          };
          return news;
        })
      );
      res.status(200).json(news);
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong" });
    });
};