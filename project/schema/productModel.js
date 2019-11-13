const mongoose = require("mongoose");
const joi = require("@hapi/joi");

let subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 }
});
let subCategory = mongoose.model("subCategory", subCategorySchema);

let categorySchema = new mongoose.Schema({
  catName: { type: String, required: true, minlength: 3, maxlength: 30 },
  subCat: [subCategorySchema]
});
let category = mongoose.model("Category", categorySchema);

let productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  image: { type: String, required: true, minlength: 3, maxlength: 30 },
  description: { type: String, required: true, minlength: 3, maxlength: 200 },
  price: { type: Number, required: true, minlength: 1 },
  offerprice: { type: Number, required: true, minlength: 1 },
  isAvailable: { type: Boolean, required: true },
  isTodayOffer: { type: Boolean, required: true },
  category: { type: String, required: true, minlength: 3, maxlength: 100 },
  subCategory: { type: String, required: true, minlength: 3, maxlength: 100 },
  isAdmin: { type: Boolean },
  recordDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

let productModel = mongoose.model("productRecord", productSchema);

function ValidationError(message) {
  let Schema = joi.object().keys({
    catName: joi
      .string()
      .required()
      .min(3)
      .max(30),
    subCatId: joi.required()
  });
  return Schema.validate(message);
}

function ProductValidationError(message) {
  let PSchema = joi.object().keys({
    name: joi
      .string()
      .required()
      .min(3)
      .max(30),
    image: joi
      .string()
      .required()
      .min(3)
      .max(30),
    description: joi
      .string()
      .required()
      .min(3)
      .max(200),
    price: joi
      .number()
      .required()
      .min(1),
    offerprice: joi
      .number()
      .required()
      .min(1),
    isAvailable: joi.boolean().required(),
    isTodayOffer: joi.boolean().required(),
    category: joi
      .string()
      .required()
      .min(3)
      .max(100),
    subCategory: joi
      .string()
      .required()
      .min(3)
      .max(100),
    isAdmin: joi.boolean(),
    recordDate: joi.date().default(Date.now()),
    updateDate: joi.date().default(Date.now())
  });
  return PSchema.validate(message);
}

module.exports = {
  subCategory,
  category,
  productModel,
  ValidationError,
  ProductValidationError
};
