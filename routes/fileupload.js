let app = require("express");
const mongoose = require("mongoose");
let multer = require("multer");
let router = app.Router();
let model = require("../model/file");
let imgPort = "http://localhost:2000";

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/file", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    let filemodel = new fmodel({
      image: imgPort + "/uploads/" + req.file.filename
    });
    if (!filemodel) {
      return res.status(403).send("title not found");
    }
    let data = await filemodel.save();

    res.send({
      message: "file uploaded",
      data: data
    });
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/:id", async (req, res) => {
  //   var id = mongoose.Types.ObjectId(req.params.id);
  let Image = await fmodel.findById(req.params.id).select("-id");
  if (!Image) {
    return res.status(404).send({ message: "Images not found" });
  }
  Image = Image.image;
  res.send({
    data: Image
  });
});

module.exports = router;
