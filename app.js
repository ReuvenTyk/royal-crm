//var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var customersRouter = require("./routes/customers");
var productsRouter = require("./routes/products");
var ordersRouter = require("./routes/orders");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
//next line add /costumers to the URL => http://localhost:3000/costumers
app.use("/customers", customersRouter);
//next line add /products to the URL => http://localhost:3000/products
app.use("/products", productsRouter);
//next line add /products to the URL => http://localhost:3000/orders
app.use("/orders", ordersRouter);

module.exports = app;
