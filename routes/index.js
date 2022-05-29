const express = require("express");
const router = express.Router();
const path = require("path");
const ordersModule = require("../controllers/orders");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("this is the home page. use /customers or /products or /orders");
});

router.get("/chat", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "chat.html");
  res.sendFile(filePath);
});

//orders
router.get("/orders", ordersModule.ordersList);
router.get("/orders-add", ordersModule.addOrders);

//calling the function without callback
//callback function
/*router.get("/customers", function (req, res, next) {
  res.send("another change");
  cm.addCustomers(
    "Mr. Green",
    "+1 (021) 145-2256",
    "green@blueberrye.com",
    3
    );
    cm.customersList(req, res);
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
