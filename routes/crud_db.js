let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

//calling model
let U = require("../mongo/users");

//creating POST API
router.post("/new_User", async (req, res) => {
  let { error } = U.ValidationError(req.body);
  if (error) {
    return res.status(403).send(error.details[0].message);
  }

  let email = await U.User.findOne({
    "userLogin.email": req.body.userLogin.email
  });

  if (email) {
    return res.status(401).send({ message: "email already exits" });
  }

  let data = new U.User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    userId: req.body.userId,
    userLogin: req.body.userLogin,
    address: req.body.address,
    mobileNo: req.body.mobileNo
  });

  let salt = await bcrypt.genSalt(10);
  data.userLogin.password = await bcrypt.hash(data.userLogin.password, salt); // encrypting password
  let items = await data.save();
  //information expert principle
  let token = items.userValidToken();
  res.header("x-auth-token", token).send({
    message: "Registration successful",
    data: items,
    token: token
  });
});

//creating PUT API
router.put("/update_User/:id", async (req, res) => {
  let user = await U.User.findOne({ userId: parseInt(req.params.id) });
  if (!user) {
    return res
      .status(401)
      .send({ message: "Cannot Update The User, Invalid ID" });
  }
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.userId = req.body.userId;
  user.userLogin = req.body.userLogin;
  user.address = req.body.address;
  user.mobileNo = req.body.mobileNo;

  let salt = await bcrypt.genSalt(10); //encrypting password
  user.userLogin.password = await bcrypt.hash(user.userLogin.password, salt);
  let items = await user.save();
  res.send({
    message: "User Updated !!!",
    data: items
  });
});

//creating DELETE API
router.delete("/remove_User/:id", async (req, res) => {
  let user = await U.User.findOne({
    userId: parseInt(req.params.id)
  });
  console.log(user);
  if (!user) {
    return res
      .status(403)
      .send({ message: " Cannot Remove The User, Invalid ID" });
  }
  let items = await U.User.findOneAndRemove({
    userId: parseInt(req.params.id)
  });
  let rdata = await items.save();
  res.send({
    message: "User Removed !!!",
    data: rdata
  });
});

//creating GET API
router.get("/userById/:id", async (req, res) => {
  let user = await U.User.findOne({ userId: parseInt(req.params.id) });
  console.log(user);
  res.send(user);
});

//creating GET API
router.get("/all_User", async (req, res) => {
  let user = await U.User.find({});
  console.log(user);
  res.send(user);
});

module.exports = router;
