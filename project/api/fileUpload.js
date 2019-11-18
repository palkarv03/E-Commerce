let app = require("express");
const mongoose = require("mongoose");
let multer = require("multer");
let Router = app.Router();
let model = require("../schema/file");
let imgPort = "http://localhost:4000";
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const filleFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filleFilter
});

Router.post("/file", upload.single("image"), async (req, res) => {
  try {
    let fileModel = new model({
      image: imgPort + "/uploads/" + req.file.filename
    });
    if (!fileModel) {
      return res.status(404).send("File Not Found");
    }
    let data = await fileModel.save();

    res.send({
      message: "File Uploaded",
      data: data
    });
  } catch (ex) {
    res.send(ex.message);
  }
});

Router.get("/:id", async (req, res) => {
  var id = mongoose.Types.ObjectId(req.params.id);
  let Image = await model.findById(req.params.id).select("-_id");
  if (!Image) {
    return res.status(404).send({ message: "Images not found" });
  }
  res.send({
    data: Image
  });
});

module.exports = Router;
