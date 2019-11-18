const express = require("express");
const router = express.Router();
const U = require("../schema/userModel");
const auth = require("./middleware/auth");
const admin = require("./middleware/admin");
// const bcrypt = require("bcrypt");

let cart = require("../schema/userCartModel");

router.get("/allUserCarts", admin, async (req, res) => {
  let allcarts = await cart.userCartItem.find({});
  if (!allcarts) {
    return res.send({ message: "No products in Cart for any User" });
  }
  res.send(allcarts);
});

// I dont know if the below code will work or not(Why it is this code :( !)
// router.post("/cartByUser", auth, async (req, res) => {
//   let { error } = await U.LoginValidationError(req.body);
//   if (!error) {
//     return res.status(403).send(error.details[0].message);
//   }
//   let user = await U.userModel.findOne({
//     "userLogin.userEmail": req.body.userLogin.userEmail
//   });
//   if (!user) {
//     return res.status(403).send("Invalid E-Mail Id");
//   }
//   let { err } = cart.ValidationError(req.body);
//   if (err) {
//     return res.status(401).send(err.details[0].message);
//   }
//   let cartItem = await cart.cartItemRecords.findById(req.body.cartItemId);
//   if (!cartItem) {
//     return res.status(402).send("Invalid cart item Id");
//   }
//   let name = await cart.cartItemRecords.findOne({
//     name: req.body.name
//   });
//   if (name) {
//     return res.status(401).send({ message: "Category already exists" });
//   }
//   let data = new cart.userCartItem({
//     userEmail: req.body.userEmail,
//     cartItem: {
//       _id: cartItem._id,
//       prodId: cartItem.prodId,
//       name: cartItem.name,
//       image: cartItem.image,
//       price: cartItem.price,
//       quantity: cartItem.quantity,
//       totalPrice: cartItem.totalPrice,
//       recordDate: cartItem.recordDate,
//       updateDate: cartItem.updateDate
//     }
//   });

//   let items = await data.save();
//   res.send({ data: items });
//   res.send(carts);
// });

router.get("/cartByUser", auth, async (req, res) => {
  let { error } = await cart.ValidationError(req.body);
  if (!error) {
    return res.status(403).send(error.details[0].message);
  }
  let cartByUser = await cart.cartItemRecords.findOne({
    userEmail: req.body.userEmail
  });
  if (!cartByUser) {
    return res.status(403).send("Cart is Empty");
  }
  res.send(cartByUser);
});

router.post("addToCart", auth, async (req, res) => {
  let { error } = await cart.CartValidationError(req.body);
  if (!error) {
    return res.status(403).send(error.details[0].message);
  }

  //Avoiding duplications of product
  let dupProd = await cart.cartItemRecords.findOne({
    prodId: req.body.prodId
  });
  if (dupProd) {
    return res.status(402).send("Product Already Exists in the Cart!!");
  }
  // let user = await cart.ValidationError.findOne({
  //   userEmail: req.body.userEmail
  // });
  // if (!user) {
  //   return res.status(403).send("Invalid E-Mail Id");
  // }
  // let { err } = cart.ValidationError(req.body);
  // if (err) {
  //   return res.status(401).send(err.details[0].message);
  // }
  // let cartItem = await cart.cartItemRecords.findById(req.body.cartItemId);
  // if (!cartItem) {
  //   return res.status(402).send("Invalid cart item Id");
  // }
  // let name = await cart.cartItemRecords.findOne({
  //   name: req.body.name
  // });
  // if (name) {
  //   return res.status(401).send({ message: "Category already exists" });
  // }
  let data = new cart.cartItemRecords({
    prodId: req.body.prodId,
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
    recordDate: Date.now(),
    updateDate: Date.now()
  });

  let items = await data.save();
  res.send({ message: "Item Added to cart successfully.", data: items });
});

router.put("/updateToCart/:id", auth, async (req, res) => {
  let carts = await cart.cartItemRecords.findById({
    _id: req.params.id
  });
  if (!carts) {
    return res.status(401).send({ message: "Invalid Cart Id" });
  }
  carts.prodId = req.body.prodId;
  carts.name = req.body.name;
  carts.image = req.body.image;
  carts.price = req.body.price;
  carts.quantity = req.body.quantity;
  carts.totalPrice = req.body.totalPrice;
  carts.updateDate = Date.now();

  let items = await carts.save();

  res.send({ message: "Cart Items Updated successfully", data: items });
});

router.delete("/removeFromCart/:id", auth, async (req, res) => {
  let cartItem = await cart.cartItemRecords.findById({
    _id: req.params.id
  });
  if (!cartItem) {
    res.status(401).send({ message: "Invalid EmailId" });
  }
  let items = await cart.cartItemRecords.findOneAndRemove({
    _id: req.params.id
  });
  let cart = await items.save();
  res.send({ message: "removed the Cart Item successfully", data: cart });
});

module.exports = router;
