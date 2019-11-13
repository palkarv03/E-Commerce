const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");

let product = require("../schema/productModel");

router.post("/addProduct", async (req, res) => {
  let { error } = product.ProductValidationError(req.body);
  if (error) {
    return res.status(401).send(error.details[0].message);
  }
  let name = await product.productModel.findOne({
    name: req.body.name
  });
  if (name) {
    return res.status(401).send({ message: "Product already exists" });
  }
  let data = new product.productModel({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    offerprice: req.body.offerprice,
    isAvailable: req.body.isAvailable,
    isTodayOffer: req.body.isTodayOffer,
    category: req.body.category,
    subCategory: req.body.subCategory,
    isAdmin: req.body.isAdmin,
    recordDate: req.body.recordDate,
    updateDate: req.body.updateDate
  });
  let items = await data.save();
  res.send({ data: items });
});

router.put("/updateProduct/:id", async (req, res) => {
  let product = await product.productModel.findById({ _id: req.params.id });
  if (!product) {
    return res.status(401).send({ message: "Invalid Product Id" });
  }
  product.name = req.body.name;
  product.image = req.body.image;
  product.description = req.body.description;
  product.price = req.body.price;
  product.offerprice = req.body.offerprice;
  product.isAvailable = req.body.isAvailable;
  product.isTodayOffer = req.body.isTodayOffer;
  product.category = req.body.category;
  product.subCategory = req.body.subCategory;
  product.isAdmin = req.body.isAdmin;
  product.recordDate = req.body.recordDate;
  product.updateDate = req.body.updateDate;

  let items = await product.save();

  res.send({ message: "updation successful", data: items });
});

router.get("/allProducts", async (req, res) => {
  let product = await product.productModel.find({});
  res.send(product);
});

router.get("/findProductById/:id", async (req, res) => {
  let prod = await product.productModel.findById({ _id: req.params.id });
  if (!prod) {
    return res.status(401).send("Invalid product id");
  }
  res.send(prod);
});

router.delete("/deleteProductById/:id", async (req, res) => {
  let prod = await product.productModel.findById({ _id: req.params.id });
  if (!prod) {
    return res.status(401).send({ message: "Invalid id" });
  }
  let items = await product.productModel.findByIdAndRemove({
    _id: req.params.id
  });

  let rdata = await items.save();
  res.send({ message: "Removed the product sucessfully", data: rdata });
});

router.get("/latestProduct", async (req, res) => {
  let latprod = await product.productModel.find({
    updateDate: { $eq: Date.now() }
  });
  if (!latprod) {
    return res
      .status(400)
      .send("No new Products available! Please come back later.");
  }
  res.send(latprod);
});

router.get("/offerProduct", async (req, res) => {
  let offprod = await product.productModel.find({
    offerprice: { $lt: price }
  });
  if (!offprod) {
    return res
      .status(400)
      .send("No new Offer on Products available! Please come back later.");
  }
  res.send(offprod);
});

router.get("/pageIndex/:id", async (req, res) => {
  let perPage = 9;
  let page = req.params.id || 1;
  let pageData = await product.productModel
    .find({})
    .skip(perPage * page - perPage)
    .limit(perPage);
  let dataCount = await product.productModel.find({}).count();
  let pageSize = Math.ceil(dataCount / perPage);
  res.send({
    perPage: perPage,
    currentPage: page,
    dataLimit: pageData,
    dataCount: dataCount,
    pageSize: pageSize
  });
});

module.exports = router;
