let express = require("express");
let router = express.Router();
let M = require("../mongo/movie");
let g = require("../mongo/genre");

router.post("/", async (req, res) => {
  let { error } = M.ValidationError(req.body);
  if (error) {
    return res.status(402).send(error.details[0].message);
  }
  let genre = await g.Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(402).send("invalid genre Id");
  }

  let movie = new M.movie({
    name: req.body.name,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    rating: req.body.rating,
    price: req.body.price
  });

  let data = await movie.save();
  res.send({ item: data });
});

module.exports = router;
