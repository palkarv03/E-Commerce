let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let U = require("../schema/userModel");
let auth = require("./middleware/auth");

//When deleting any record check for Admin
//let Admin = require("./middleware/admin");

//loggedIn User
router.get("/me", auth, async (req, res) => {
  let data = await U.userModel
    .findById(req.userModel._id)
    .select("-userLogin.userPassword");
  res.send(data);
});

//Get All User
router.get("/allUser", async (req, res) => {
  let user = await U.userModel.find({});
  if (!user) {
    return res.status(403).send("No Users Found!");
  }
  res.send(user);
});

//Create new User
router.post("/newUser", async (req, res) => {
  let { error } = U.ValidationError(req.body);
  if (error) {
    return res.status(403).send(error.details[0].message);
  }
  let email = await U.userModel.findOne({
    "userLogin.userEmail": req.body.userLogin.userEmail
  });
  if (!email) {
    return res.status(401).send("User Email already exists");
  }
  let data = new U.userModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    newsLetterCheck: req.body.newsLetterCheck,
    userLogin: req.body.userLogin,
    termsAcceptCheck: req.body.termsAcceptCheck,
    resetPasswordToken: req.body.resetPasswordToken,
    resetPasswordExpires: req.body.resetPasswordExpires,
    isAdmin: req.body.isAdmin
  });
  let salt = await bcrypt.genSalt(10);
  data.userLogin.userPassword = await bcrypt.hash(
    data.userLogin.userPassword,
    salt
  );

  let items = await data.save();

  let token = items.userValidToken();

  res
    .header("x-auth-token", token)
    .send({ message: "registration successful", data: items, token: token });
});

module.exports = router;
