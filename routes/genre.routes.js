let express = require("express");
let router = express.Router();
let g = require("../mongo/genre");

router.post("/", async (req, res) => {
  let { error } = g.ValidationError(req.body);
  if (error) {
    return res.status(402).send(error.details[0].message);
  }

  let genre = new g.Genre({
    name: req.body.name
  });

  let data = await movie.save();
  res.send({ item: data });
});

module.exports = router;
