let mongoose = require("mongoose");
let G = require("./genre");
let Joi = require("@hapi/joi");

let Schema = new mongoose.Schema({
  name: { type: String, min: 5, max: 20, required: true },
  genre: { type: G.GenreSchema, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true }
});

let Movie = mongoose.model("movies", Schema);

function ValidationError(message) {
  let Schema = Joi.object().keys({
    name: Joi.String()
      .required()
      .min(5)
      .max(20),
    genreId: Joi.required(),
    rating: Joi.Number().required(),
    price: Joi.required().Number()
  });
  return Joi.validate(message, Schema);
}

module.exports = { Schema, Movie, ValidationError };
