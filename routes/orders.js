const express = require("express");
const router = express.Router();
const om = require("../controllers/orders");
const path = require("path");
const fileMgmt = require("../shared/fileMgmt");

//${environment.serverUrl}/orders => the router it gets from app.js
router.get("/home", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("orders-home.html");
  res.sendFile(filePath);
});

router.get("/", om.ordersList);
/* router.get("/", om.addOrders); */
router.get("/export", om.exportOrders);

module.exports = router;
