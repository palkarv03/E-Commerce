const jwt = require("jsonwebtoken");
const config = require("config");

function UserAuthMiddleware(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access Denied!Please provide the token");
  }
  try {
    let decoded = jwt.verify(token, config.get("usertoken"));
    req.userModel = decoded;
    next();
  } catch (ex) {
    res.send("Invalid token");
  }
}

module.exports = UserAuthMiddleware;
