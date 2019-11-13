function DummyMiddleware(req, res, next) {
  console.log("loading middleware");
  next();
}
module.exports = DummyMiddleware;
