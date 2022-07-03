//var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const createError = require("http-errors");
const headers = require("./middleware/headers");

//auth router
const auth = require("./middleware/auth");

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
app.use(express.static(path.join(__dirname, "files")));

app.use(headers);
//add the auth to the routers to denied the access without login
app.use("/", indexRouter);
app.use("/users", auth, usersRouter);
//next line add /costumers to the URL => ${environment.serverUrl}/costumers
app.use("/customers", auth, customersRouter);
//next line add /products to the URL => ${environment.serverUrl}/products
app.use("/products", auth, productsRouter);
//next line add /products to the URL => ${environment.serverUrl}/orders
app.use("/orders", auth, ordersRouter);

//catch 404 err forward error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//custom error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(500).send(err);
});
module.exports = app;
