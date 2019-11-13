let mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/Vishal", { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("Something went wrong", err));
mongoose.set("useFindAndModify", false);
