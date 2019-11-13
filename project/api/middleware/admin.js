function Admin(req, res, next) {
  if (!req.userModel.isAdmin) {
    return res
      .status(401)
      .send("Access Denied ! You Don't Have The Admin Access");
  }
  next();
}

module.exports = Admin;
