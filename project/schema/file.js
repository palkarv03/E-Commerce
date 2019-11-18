const mongoose = require("mongoose");

let fileSchema = new mongoose.Schema({
  image: { type: String, required: true }
});

let file = mongoose.model("file", fileSchema);
module.exports = file;
