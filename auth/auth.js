const express = require("express");
const router = express.Router();
let bcrypt = require("bcrypt");
const U = require("../mongo/users");
let joi = require("@hapi/joi");

//creating authorization API
router.post("/", async (req, res) => {
  let { error } = loginValidationError(req.body);
  if (error) {
    return res.status(402).send(error.details[0].message);
  }
  let user = await U.User.findOne({
    "userLogin.email": req.body.userLogin.email
  });
  if (!user) {
    return res.status(403).send("Cannot Find The Email ID, Please Try Again");
  }
  let password = await bcrypt.compare(
    req.body.userLogin.password,
    user.userLogin.password
  );
  if (!password) {
    return res.status(403).send("Password Doesn't Match ! Please Try Again");
  }
  let token = user.userValidToken();
  if (!token) {
    return res.status(403).send("Invalid Token ID");
  }
  res.send(token);
});

function loginValidationError(message) {
  let Schema = joi.object().keys({
    userLogin: {
      email: joi.string().required(),
      password: joi.string().required()
    }
  });
  return joi.validate(message, Schema);
}

module.exports = router;
