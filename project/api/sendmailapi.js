let nodemailer = require("nodemailer");
let express = require("express");
let router = express.Router();
const crypto = require("crypto");
let Model = require("../schema/userModel");
let M = Model.model;

//API for sending mail to user
router.post("/userMail", async (req, res) => {
  try {
    let token = crypto.randomBytes(32).toString("hex");
    let userEmail = await M.findOne({
      userEmail: req.body.userEmail
    });
    if (!userEmail) {
      return res.status(401).send({ message: "Invalid email id" });
    }
    userEmail.resetPasswordToken = token;
    userEmail.resetPasswordExpires = Date.now() + 3600000;
    userEmail = await userEmail.save();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "gupta15harrish@gmail.com",
        pass: "harrish@1511"
      }
    });

    if (!transporter)
      return res.status(401).send({ message: "Something went wrong" });

    let mailOptions = {
      from: '"E-Shop:" <gupta15harrish@gmail.com>',
      to: userEmail.userEmail,
      subject: "Reset Your Password",
      text:
        "Open this link to change your password http://localhost:4200/forgotpasswordapi/" +
        token
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });

    res
      .header("x-auth-token", token)
      .status(200)
      .send({
        message: "message send",
        token: token,
        data: userEmail
      });
  } catch (ex) {
    res.status(401).send(ex);
  }
});

module.exports = router;
