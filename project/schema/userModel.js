const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const joi = require("@hapi/joi");

let userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, minlength: 3, maxlength: 30 },
  lastname: { type: String, required: true, minlength: 3, maxlength: 30 },
  newsLetterCheck: { type: Boolean },
  userLogin: {
    userEmail: { type: String, required: true, minlength: 3, maxlength: 30 },
    userPassword: { type: String, required: true, minlength: 3, maxlength: 30 }
  },
  termsAcceptCheck: { type: Boolean, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  isAdmin: { type: Boolean },
  recordDate: { type: Date, default: Date.now() },
  updateDate: { type: Date, default: Date.now() }
});

userSchema.methods.userValidToken = function() {
  let token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("usertoken")
  );
  return token;
};

let userModel = mongoose.model("userRecord", userSchema);

function ValidationError(message) {
  let Schema = joi.object().keys({
    firstname: joi
      .string()
      .required()
      .min(3)
      .max(30),
    lastname: joi
      .string()
      .required()
      .min(3)
      .max(30),
    newsLetterCheck: joi.boolean(),
    userLogin: {
      userEmail: joi
        .string()
        .required()
        .min(3)
        .max(30),
      userPassword: joi
        .string()
        .required()
        .min(3)
        .max(30)
    },
    termsAcceptCheck: joi.boolean().required(),
    resetPasswordToken: joi.string(),
    resetPasswordExpires: joi.date(),
    isAdmin: joi.boolean(),
    recordDate: joi.date().default(Date.now()),
    updateDate: joi.date().default(Date.now())
  });
  return Schema.validate(message);
}

function LoginValidationError(message) {
  let Schema = joi.object().keys({
    userLogin: {
      userEmail: joi
        .string()
        .required()
        .min(3)
        .max(30),
      userPassword: joi
        .string()
        .required()
        .min(3)
        .max(30)
    }
  });
  return Schema.validate(message);
}

module.exports = { userModel, ValidationError, LoginValidationError };
