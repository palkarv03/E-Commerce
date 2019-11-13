let express = require("express");
let router = express.Router();
// const Joi = require("@hapi/joi");

// array of object
let details = [
  {
    firstname: "Vishal",
    lastname: "Palkar",
    userId: 1,
    userLogin: {
      Email: "visha@123",
      password: "vishal123"
    },
    Address: {
      state: "Maharashtra",
      city: "Ulhasnagar",
      pincode: 421004
    },
    Mobile: 8805109685
  },
  {
    firstname: "Adil",
    lastname: "kazi",
    userId: 2,
    userLogin: {
      Email: "adil@123",
      password: "adil123"
    },
    Address: {
      state: "Maharashtra",
      city: "Mumbra",
      pincode: 421005
    },
    Mobile: 9769549226
  },
  {
    firstname: "Tejas",
    lastname: "Sawant",
    userId: 3,
    userLogin: {
      Email: "tejas@123",
      password: "tejas123"
    },
    Address: {
      state: "Maharashtra",
      city: "Thane",
      pincode: 421006
    },
    Mobile: 8108107685
  },
  {
    firstname: "Harrish",
    lastname: "Gupta",
    userId: 4,
    userLogin: {
      Email: "harrish@123",
      password: "harrish123"
    },
    Address: {
      state: "Maharashtra",
      city: "Bhandup",
      pincode: 421007
    },
    Mobile: 9004223728
  }
];

//creating data API
router.get("/all_Customer", (req, res) => {
  res.send(details);
});

//music calling by id
router.get("/all_Customer/:id", (req, res) => {
  let record = details.find(item => item.userId === parseInt(req.params.id));
  //   console.log(item);
  if (!record) {
    return res.status(403).send({
      message: "Invalid id"
    });
  }
  res.send(record);
});

//add new music
router.post("/new_Customer", (req, res) => {
  let newRecord = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    userId: details.length + 1,
    userLogin: req.body.userLogin,
    Address: req.body.Address,
    Mobile: req.body.Mobile
  };
  details.push(newRecord);
  res.send(details);
});

//update album
router.put("/update_Customer/:id", (req, res) => {
  let record = details.find(item => item.userId === parseInt(req.params.id));
  //   console.log(record);
  if (!record) {
    return res.status(403).send({
      message: "Invalid id"
    });
  }
  record.firstname = req.body.firstname;
  record.lastname = req.body.lastname;
  record.userId = req.body.userLogin;
  record.userLogin = req.body.userLogin;
  record.Address = req.body.Address;
  record.Mobile = req.body.Mobile;
  res.send(record);
});

//delete album
router.delete("/remove_Customer/:id", (req, res) => {
  let record = details.find(item => item.userId === parseInt(req.params.id));
  console.log(record);
  if (!record) {
    return res.status(403).send({
      message: "Invalid id"
    });
  }
  let index = details.indexOf(record);
  let data = details.splice(index, 1);
  res.send({
    message: "Data removed successfully !"
  });
});

module.exports = router;
