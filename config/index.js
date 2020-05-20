const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017';
const dbName = 'entertainme';
const client = new MongoClient(url, { useUnifiedTopology: true });

var db;

function connect(callback) {
  client.connect((err) => {
    if (err) {
      console.log("Connection error", err);
    } else {
      console.log("Connected successfully to server");

      db = client.db(dbName);

      db.createCollection("Movies", {
        validator: { $jsonSchema: {
          bsonType: "object",
          required: [ "title", "overview", "poster_path", "popularity", "tags" ],
          properties: {
            title: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            overview: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            poster_path: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            popularity: {
              bsonType: "double",
              maximum: 10,
              minimum: 0,
              description: "must be a double and is required"
            },
            tags: {
              bsonType: "array",
              description: "must be a string and is required",
              uniqueItems: true
            }
          }
        }}
      })
    }

    callback(err)
  });
}

function getMovie() {
  return db;
}

module.exports = { connect, getMovie };