const mongo = require("mongodb");
const { getMovie } = require("../config");
const db = getMovie();

const collection = db.collection("Movies");

class MovieModel {
  static find() {
    return collection.find().toArray();
  }

  static insertOne(data) {
    data = { ...data, popularity: mongo.Double(data.popularity)};
    return collection.insertOne(data);
  }

  static deleteOne(id) {
    return collection.deleteOne({ "_id": new mongo.ObjectID(id) });
  }

  static updateOne(id, data) {
    data = { ...data, popularity: mongo.Double(data.popularity)};
    return collection.updateOne({ "_id": new mongo.ObjectID(id) }, { $set: data })
  }
}

module.exports = MovieModel;

