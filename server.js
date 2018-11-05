const express = require("express");
const app = express();
const compression = require('compression')
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
//const mongoose = require("mongoose");
//const keys = require("./config/keys");
//const passport = require("passport");
//const cookieSession = require("cookie-session");
app.use(compression());
////load schema models/////

//////connect to database//////
/*
mongoose
  .connect(
    keys._______,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected To Mongo"))
  .catch(err => console.log(err));
*/
////user bodyparser to properly recieve data/////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////use cookie session to encrypt cookie from authentication and admniister its lifespan////


////activate routes/////
//require("./routes")(app);
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT);
