const express = require("express");
const router = express.Router();
// const Model = require("../model/user");
// const userModel = Model.model;
// const bcrypt = require("bcrypt");
// const joi = require("joi");

router.post("/userPassword/:token", async (req, res) => {
  try {
    let user = await userModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(401).send("invalid token id");
    let result = ValidationError(req.body);
    if (result.error) {
      return res.status(403).send(result.error.details[0].message);
    }
    let d = await bcrypt.compare(user.Password, req.body.Password);
    console.log(d); //d gives false if matched
    if (!d) {
      return res
        .status(403)
        .send({ message: "password is same like older, please enter another" });
    }

    user.Password = req.body.Password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    let salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
    console.log("password" + user.Password + "and user is " + user);

    if (d) {
    }
    user = await user.save();
    res.send({
      message: "password updated",
      data: user
    });
  } catch (ex) {
    res.send(ex);
  }
});

function ValidationError(error) {
  let schema = {
    Password: joi.string().required()
  };
  return joi.validate(error, schema);
}

module.exports = router;
