var express = require("express");
var router = express.Router();
const customersModule = require("../controllers/customers");
const productsModule = require("../controllers/products");
const ordersModule = require("../controllers/orders");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("this is the home page. use /customers or /products or /orders");
});
router.get("/customers", customersModule.customersList);
router.get("/products", productsModule.productsList);
router.get("/orders", ordersModule.ordersList);

//calling the function without callback
//callback function
/*router.get("/customers", function (req, res, next) {
  res.send("another change");
  customersModule.addCustomers(
    "Mr. Green",
    "+1 (021) 145-2256",
    "green@blueberrye.com",
    3
    );
    customersModule.customersList(req, res);
}); 

 router.get("/products", function (req, res, next) {
  productsModule.addProducts("Milk", "something to drink", "5.7");
  productsModule.addProducts("Water", "for the soul", "2.7");
  productsModule.productsList(req, res);
}); 

 router.get("/orders", function (req, res, next) {
  ordersModule.addOrders(62, 1, "5.7", 2);
  ordersModule.ordersList(req, res);
}); */

module.exports = router;
