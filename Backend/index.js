const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
//
const app = express();
//app.use(bodyparser.urlencoded({ extended: false }));
//app.use(bodyparser.json());
//
app.get("/", (req, res) => {
  res.send({
    message: "bienvenido",
  });
});
//port

const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;
//Midleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
////
const authR = require("./routes/authRoute");
const catR = require("./routes/categoryRoute");
const prodR = require("./routes/productRoute");
app.use("/api/v1/auth", authR);
app.use("/api/v1/category", catR);
app.use("/api/v1/product", prodR);
//
app.listen(port, () => {
  console.log(`servidor corriendo ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
