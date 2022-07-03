const express = require("express");
const router = express.Router();
const cm = require("../controllers/customers");
const path = require("path");
const fileMgmt = require("../shared/fileMgmt");

//${environment.serverUrl}/costumers => the router it gets from app.js
router.get("/home", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("customers-home.html");
  res.sendFile(filePath);
});

//${environment.serverUrl}/costumers/details/:id =>changing parameter
router.get("/details/:id", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("customer-details.html");
  res.sendFile(filePath);
});

router.get("/", cm.customersList);
router.get("/find", cm.findCustomer);
router.get("/export", cm.exportCustomer);
router.post("/", cm.addCustomers);
//router.patch("/", cm.updateCustomer);
//router.delete("/", cm.deleteCustomer);

module.exports = router;
