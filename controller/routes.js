//Custom Modules
let api = require("../routes/api");
let customer = require("../routes/crud");
const express = require("express");
let crud = require("../routes/crud_db");
// const config = require("config");

//calling Movie API
let movie = require("../routes/movie.routes");
let genre = require("../routes/genre.routes");
let file = require("../routes/fileupload");

//authorization
let auth = require("../auth/auth");

module.exports = function(app) {
  app.use("/api/music", api);
  app.use("/api/customer", customer);
  app.use("/api/crud", crud);
  app.use("/api/movie", movie);
  app.use("/api/genre", genre);
  app.use("/uploads", express.static("uploads"));
  app.use("/api/fileupload", file);
  app.use("/api/auth", auth);
  // app.use("/api/user", mailer);
  // app.use("/api/user", forgotPassword);
};
