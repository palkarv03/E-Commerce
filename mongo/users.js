let mongoose = require("mongoose");
let Joi = require("@hapi/joi");
let jwt = require("jsonwebtoken");

//creating Schema
let userSchema = mongoose.Schema({
  firstname: { type: String, required: true, min: 5, max: 20 },
  lastname: { type: String, required: true, min: 5, max: 20 },
  userId: { type: Number, required: true },
  userLogin: {
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: Number, required: true }
  },
  mobileNo: { type: Number, required: true }
});

//Calling JWT
userSchema.methods.userValidToken = function() {
  let token = jwt.sign(
    { _id: this._id, firstname: this.firstname },
    "userPrivateKey"
  );
  return token;
};

//Calling model
let User = mongoose.model("Users", userSchema);

//creating Validation Error( validating )
function ValidationError(message) {
  let Schema = Joi.object().keys({
    firstname: Joi.string()
      .required()
      .min(5)
      .max(20),

    lastname: Joi.string()
      .required()
      .min(5)
      .max(20),

    userId: Joi.number().required(),

    userLogin: {
      email: Joi.string().required(),
      password: Joi.string().required()
    },

    address: {
      state: Joi.string().required(),
      city: Joi.string().required(),
      pinCode: Joi.number().required()
    },

    mobileNo: Joi.number().required()
  });

  return Joi.validate(message, Schema);
}

//exporting model & function
module.exports = { User, ValidationError };
