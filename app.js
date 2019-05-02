const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const passport = require("passport");
const path = require("path");
const app = express();

// Port
const port = process.env.PORT || 5000;

// Routes
const manga = require("./routes/api/manga");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "25mb" }));

// //Passport Middleware
// app.use(passport.initialize());

// // Passport Config
// require("./config/passport.js")(passport);

//Use Routes
app.use("/api/manga", manga);

// Server static assests if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(
          __dirname,
          "client",
          "build",
          "index.html"
        )
      );
    });
  }


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
