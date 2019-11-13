let express = require("express");
let router = express.Router();

let movies = [
  {
    name,
    genre,
    rating,
    price
  }
];

router.get("/api/movies/all_Movies", (req, res) => {
  res.send(movies);
});

router.post("/api/movies", (req, res) => {});

router.post("/api/movies/genre", (req, res) => {});
