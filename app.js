const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const hbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const route = require('./routes/route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// statice files path

app.use(express.static(path.join(__dirname, "public/")));

// setting view engine

app.set("view engine", "hbs");
route.set("views", path.join(__dirname + "/view"));
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "layout",
    layoutsDir: __dirname + "/view",
  })
);

app.use('/',route)







mongoose.connect(process.env.MONGO_CONNECT).then(()=>console.log('Database connection established'))

app.listen(process.env.PORT, () =>
  console.log("listening on port", process.env.PORT)
);
