let nodemailer = require("nodemailer");
let express = require("express");
let router = express.Router();
const crypto = require("crypto");
// let Model = require(""); //files.js

router.post("/usermail", async (req, res) => {
  try {
    let token = crypto.randomBytes(32).toString("hex");
    let userEmail = await userModel.findOne({
      EmailId: req.body.EmailId
    });

    // console.log(token);
    userEmail.resetPasswordToken = token;
    userEmail.resetPasswordExpires = Date.now() + 3600000;
    userEmail = await userEmail.save();

    console.log(userEmail);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, //true for 465, false for other ports
      auth: {
        user: "palkarv03@gmail.com", //genereted ethereal email
        pass: "vishal@123" //generated ethereal password
      }
    });

    if (!transporter)
      res.status(401).send({
        message: "something went wrong"
      });

    let mailOptions = {
      from: '"Harry Apps: learn_with_harry:" <palkarv03@gmail.com',
      to: userEmail.EmailId,
      subject: "Reset your Password",
      text:
        "Open this link to change your password http://localhost:4200/forgotpassword/" +
        token
    };

    transporter.resetPasswordToken(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });

    res
      .header("x-auth-token", token)
      .status(200)
      .send({
        messsage: "message send",
        token: token,
        data: userEmail
      });
  } catch (ex) {
    res.status(401).send(ex);
  }
});

module.exports = router;
