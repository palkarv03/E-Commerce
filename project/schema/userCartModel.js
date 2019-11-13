let mongoose = require("mongoose");

let cartItemSchema = new mongoose.Schema({
  prodId: { type: String, required: true, minlength: 3, maxlength: 100 },
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  image: { type: String, required: true, minlength: 3, maxlength: 30 },
  price: { type: Number, required: true, minlength: 1, maxlength: 10 },
  quantity: { type: Number, required: true, minlength: 1, maxlength: 10 },
  totalPrice: { type: Number, required: true, minlength: 1, maxlength: 10 },
  recordDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});
let cartItemRecords = mongoose.model("cartItemRecords", cartItemSchema);

let userCartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, minlength: 3, maxlength: 30 },
  cartItem: [cartItemSchema]
});
let userCartItem = mongoose.model("userCartItem", userCartSchema);

function ValidationError(message) {
  let Schema = joi.object().keys({
    userEmail: joi
      .string()
      .required()
      .min(3)
      .max(30),
    cartItemId: joi.required()
  });
  return Schema.validate(message);
}

function CartValidationError(message) {
  let Schema = joi.object().keys({
    prodId: joi
      .string()
      .required()
      .min(3)
      .max(100),
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
    price: joi
      .number()
      .required()
      .min(1)
      .max(10),
    quantity: joi
      .number()
      .required()
      .min(1)
      .max(10),
    totalPrice: joi
      .number()
      .required()
      .min(1)
      .max(10),
    recordDate: joi.date().default(Date.now()),
    updateDate: joi.date().default(Date.now())
  });
  return Schema.validate(message);
}

module.exports = {
  cartItemRecords,
  userCartItem,
  ValidationError,
  CartValidationError
};
