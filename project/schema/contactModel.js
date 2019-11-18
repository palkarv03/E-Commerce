const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

//Creating schema for contacts
let contactSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: { type: String, unique, required: true, minlength: 5, maxlength: 50 },
  message: { type: String, required: true, minlength: 5, maxlength: 50 }
});

let contacts = mongoose.model("contacts", contactSchema);

function ValidationError(message) {
  let Schema = joi.object().keys({
    name: joi
      .string()
      .required()
      .min(5)
      .max(50),
    email: joi
      .string()
      .unique()
      .required()
      .min(5)
      .max(50),
    message: joi
      .string()
      .required()
      .min(5)
      .max(50)
  });
  return Schema.validate(message);
}
module.exports = { contacts, ValidationError };
