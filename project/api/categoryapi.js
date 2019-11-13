const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");

let category = require("../schema/productModel");

router.post("/addCategory", async (req, res) => {
  let { error } = category.ValidationError(req.body);
  if (error) {
    return res.status(401).send(error.details[0].message);
  }
  let subCat = await category.subCategory.findById(req.body.subCatId);
  if (!subCat) {
    return res.status(402).send("Invalid subcategory Id");
  }
  let name = await category.category.findOne({
    catName: req.body.catName
  });
  if (name) {
    return res.status(401).send({ message: "Category already exists" });
  }
  let data = new category.category({
    catName: req.body.catName,
    subCat: {
      _id: subCat._id,
      name: subCat.name
    }
  });
  let items = await data.save();
  res.send({ data: items });
});

router.get("/allCategory", async (req, res) => {
  let category = await category.category.find({});
  res.send(category);
});

router.get("/findCategoryById/:id", async (req, res) => {
  let cat = await category.category.findById({ _id: req.params.id });
  if (!cat) {
    return res.status(401).send("Invalid category id");
  }
  res.send(cat);
});

router.delete("/deleteCategoryById/:id", async (req, res) => {
  let cat = await category.category.findById({ _id: req.params.id });
  if (!cat) {
    return res.status(401).send({ message: "Invalid id" });
  }
  let items = await category.category.findByIdAndRemove({ _id: req.params.id });

  let rdata = await items.save();
  res.send({ message: "Removed the category sucessfully", data: rdata });
});

router.get("/category/:category/page/:pageIdx", async (req, res) => {
  let cat = await category.category.findById({ _id: req.params.category });
  if (!cat) {
    return res.status(401).send("Invalid category id");
  }
  let perPage = 9;
  let page = req.params.pageIdx || 1;
  let pageData = await cat
    .find({})
    .skip(perPage * page - perPage)
    .limit(perPage);
  let dataCount = await cat.find({}).count();
  let pageSize = Math.ceil(dataCount / perPage);
  res.send({
    perPage: perPage,
    currentPage: page,
    dataLimit: pageData,
    dataCount: dataCount,
    pageSize: pageSize
  });
});

router.get(
  "/category/:category/subcategory/:subcategory/page/:pageIdx",
  async (req, res) => {
    let cat = await category.category.findById({ _id: req.params.category });
    if (!cat) {
      return res.status(401).send("Invalid category id");
    }
    let subCat = await category.subCategory.findById({
      _id: req.params.subcategory
    });
    if (!subCat) {
      return res.status(402).send("Invalid subcategory Id");
    }
    let perPage = 9;
    let page = req.params.pageIdx || 1;
    let pageData = await subCat
      .find({})
      .skip(perPage * page - perPage)
      .limit(perPage);
    let dataCount = await subCat.find({}).count();
    let pageSize = Math.ceil(dataCount / perPage);
    res.send({
      perPage: perPage,
      currentPage: page,
      dataLimit: pageData,
      dataCount: dataCount,
      pageSize: pageSize
    });
  }
);

module.exports = router;
