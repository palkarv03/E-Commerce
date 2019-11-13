const mongoose = require("mongoose");
let Joi = require("@hapi/joi");

let GenreSchema = new mongoose.Schema({
  name: { type: String, min: 5, max: 20, required: true }
});

let Genre = mongoose.model("genre", GenreSchema);
function ValidationError(message) {
  let Schema = Joi.object().keys({
    name: Joi.string()
      .min(5)
      .max(20)
      .required()
  });
  return Joi.validate(message, Schema);
}

module.exports = { GenreSchema, Genre, ValidationError };
