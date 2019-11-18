function Admin(req, res, next) {
  if (!req.userModel.isAdmin) {
    return res.status(401).send("You do not have Admin access! Access Denied");
  }
  next();
}

module.exports = Admin;
