const express = require("express");
const router = express.Router();

const U = require("../../schema/userModel");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  let { error } = await U.LoginValidationError(req.body);
  if (!error) {
    return res.status(403).send(error.details[0].message);
  }
  let user = await U.userModel.findOne({
    "userLogin.userEmail": req.body.userLogin.userEmail
  });
  if (!user) {
    return res.status(403).send("Invalid E-Mail Id");
  }
  let password = await bcrypt.compare(
    req.body.userLogin.userPassword,
    user.userLogin.userPassword
  );
  if (!password) {
    return res.status(403).send("Invalid Password");
  }
  let token = user.userValidToken();
  if (!token) {
    return res
      .status(401)
      .send("Token not generated for the given email and password");
  }
  res.send(token);
});

module.exports = router;
