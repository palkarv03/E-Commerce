let mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/Vishal", { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log("Something went wrong", err));

let movieSchema = new mongoose.Schema({
  name: { type: String },
  genre: { type: String },
  rating: { type: Number },
  price: { type: Number }
});

let genreSchema = new mongoose.Schema({
  name: { type: String },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movies" }
});

let Movie = mongoose.model("Movies", movieSchema);
let Genre = mongoose.model("Genre", genreSchema);

async function Movies() {
  let data = new Movie({
    name: "Gravity",
    genre: "science fiction",
    rating: "5",
    price: "120"
  });
  let items = await data.save();
  console.log(items);
}

async function Genres() {
  let data = new Genre({
    name: "science fiction",
    movieId: "5d766df31be2bc35b097e3b1"
  });
  let items = await data.save();
  console.log(items);
}

// Movies();
// Genres();

async function allMovies() {
  let data = await Genre.find().populate("movieId");
  console.log(data);
}

allMovies();
module.exports = router;
