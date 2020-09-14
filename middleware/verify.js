const axios = require("axios");

exports.checkIdInput = (req, res, next) => {
  if (
    isNaN(req.params.episode_id) ||
    !Number.isInteger(Number(req.params.episode_id))
  ) {
    return res.status(400).json({ error: "Invalid ID supplied" });
  } else {
    next();
  }
};

exports.checkIdExist = (req, res, next) => {
  axios
    .get("https://swapi.dev/api/films")
    .then(films => {
      if (0 < req.params.episode_id <= films.data.count) {
        next();
      } else {
        return res.status(404).json({ error: "Movie not found" });
      }
    })
    .catch(err => {
      return res.status(500).json({ error: "Something went wrong" });
    });
};
