const axios = require("axios");
const express = require("express");
const { Comment } = require("../models");
const { validationResult } = require("express-validator");
const { sortBy } = require("../util/sort");

exports.list = async (req, res) => {
  let people = await axios.get("https://swapi.dev/api/people");

  let crawl = async obj => {
    if (obj.data.next) {
      let new_obj = await axios.get(obj.data.next);
      return obj.data.results.concat(await crawl(new_obj));
    } else {
      return obj.data.results;
    }
  };

  let fin = await crawl(people);

  if (
    req.query.filter &&
    ["female", "male"].includes(req.query.filter.toLowerCase())
  ) {
    fin = fin.filter(function(o) {
      return o.gender == req.query.filter.toLowerCase();
    });
  }

  if (
    req.query.sort &&
    req.query.order &&
    ["height", "name"].includes(req.query.sort.toLowerCase()) &&
    ["desc", "asc"].includes(req.query.order.toLowerCase())
  ) {
    fin = fin.sortBy(function(o) {
      return req.query.sort.toLowerCase() == "height" ? o.height : o.name;
    });
    req.query.order.toLowerCase() == "asc" ? fin : fin.reverse();
  }
  res.status(200).json(fin);
};
