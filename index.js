const express = require("express");
const breadsController = require("./controllers/breads_controller");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.get("/", (req, res) => {
  //   res.send("Welcome to the bread app!");
  res.render("Home");
});

app.use("/breads", breadsController);

// 404 Page
app.get("*", (req, res) => {
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`\n***Listening on port:${PORT}****\n`);
});
