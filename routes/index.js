var express = require("express");
var router = express.Router();
const customersModule = require("../controllers/customers");
const productsModule = require("../controllers/products");
const ordersModule = require("../controllers/orders");

/* GET home page. */
router.get("/", function (req, res, next) {
  //res.send("another change");
  customersModule.addCustomers(
    "Mr. Green",
    "+1 (021) 145-2256",
    "green@blueberrye.com",
    3
  );

  customersModule.addCustomers(
    "Brun Tech",
    "+251 966 522456",
    "info@brun-tech.com",
    5
  );

  customersModule.addCustomers(
    "Bakala - Grocery Store",
    "+972 3 7070 111",
    "bakala@gmail.com",
    1
  );
  customersModule.customersList(req, res);
});

router.get("/products", function (req, res, next) {
  productsModule.addProducts("Milk", "something to drink", "5.7");
  productsModule.productsList(req, res);
});

router.get("/orders", function (req, res, next) {
  ordersModule.addOrders("5.7", 2);
  ordersModule.ordersList(req, res);
});

module.exports = router;
