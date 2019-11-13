const express = require("express");
const app = express();
app.use(express.json());
let mongoose = require("mongoose");
require("../controller/routes")(app);
const config = require("config");

//declaring configurations
// console.log(`name : ${config.get("name")}`);
// console.log(`mail : ${config.get("host.mail")}`);

//Setting Environment
console.log(`production mode: ${process.env.Node_Env}`);
console.log(`development mode: ${app.set("env")}`);

// const mailer = require("../routes/userMail");
// const forgotPassword = require("../routes/forgotpassword");

let port = process.env.port || 4008; //port Number
//database connection
mongoose
  .connect("mongodb://localhost/Vishal", { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("Something went wrong", err));

//creating server port
app.listen(port, () => {
  console.log(`server working on port number ${port}`);
});
