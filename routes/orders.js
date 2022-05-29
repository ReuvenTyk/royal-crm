const express = require("express");
const router = express.Router();
const om = require("../controllers/orders");
const path = require("path");

//http://localhost:3000/orders => the router it gets from app.js
router.get("/home", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "orders-home.html");
  res.sendFile(filePath);
});

router.get("/", om.ordersList);
/* router.get("/", om.addOrders); */
router.get("/export", om.exportOrders);

module.exports = router;
