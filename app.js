require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongo = require("./config");

mongo.connect((err) => {
  if (!err) {
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    app.use("/", require("./routes"));
    app.use((err, req, res, next) =>
    {
      if (err.errmsg == "Document failed validation")
          return res.status(400).json({"error" : err.errmsg});
          
      return res.status(500).json(err);
    });

    app.listen(PORT, () => console.log("Server running on PORT " + PORT));
  }
})