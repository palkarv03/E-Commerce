let express = require("express");
let router = express.Router();
// const Joi = require("@hapi/joi");

// array of object
let music = [
  {
    id: 1,
    song: "Let me love you"
  },
  {
    id: 2,
    song: "Despacito"
  },
  {
    id: 3,
    song: "Rockstar"
  },
  {
    id: 4,
    song: "Purpose"
  },
  {
    id: 5,
    song: "See you again"
  }
];

//creating data API
router.get("/all_Music", (req, res) => {
  res.send(music);
});

//music calling by id
router.get("/all_Music/:id", (req, res) => {
  let album = music.find(item => item.id === parseInt(req.params.id));
  console.log(album);
  if (!album) {
    return res.status(403).send({
      message: "Invalid id"
    });
  }
  res.send(album);
});

//add new music
router.post("/new_Album", (req, res) => {
  let newMusic = {
    id: music.length + 1,
    song: req.body.song
  };
  music.push(newMusic);
  res.send(music);
});

//update album
router.put("/update_Album/:id", (req, res) => {
  let album = music.find(item => item.id === parseInt(req.params.id));
  if (!album) {
    return res.status(403).send({
      message: "Invalid id"
    });
  }
  album.song = req.body.song;
  res.send(album);
});

//delete album
router.delete("/remove_Album/:id", (req, res) => {
  let album = music.find(item => item.id === parseInt(req.params.id));
  if (!album) {
    return res.status(403).send({
      message: "Invalid id"
    });
  }
  let index = music.indexOf(album);
  let data = music.splice(index, 1);
  res.send({
    message: "Data removed successfully !"
  });
});

module.exports = router;
