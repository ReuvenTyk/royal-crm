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

module.exports = router;
