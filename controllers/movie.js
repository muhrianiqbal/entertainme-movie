const Movie = require("../models/movie");

class MovieController {
  static create(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const movie = { title, overview, poster_path, popularity, tags };

    Movie.insertOne(movie)
      .then(data => {
        res.status(201).json(data.ops[0]);
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }

  static read(req, res, next) {
    Movie.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }

  static update(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const movie = { title, overview, poster_path, popularity, tags };
    const {id} = req.params;

    Movie.updateOne(id, movie)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }
  
  static delete(req, res, next) {
    const {id} = req.params;

    Movie.deleteOne(id)
      .then(data => {
        if (data.result.n) {
          return res.status(200).json({ deleteStatus: true });
        } 
        return res.status(400).json({ deleteStatus: false });
      })
      .catch(err => {
        console.log(err);
        next(err);
      })
  }
}

module.exports = MovieController;