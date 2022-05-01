var express = require("express");
var router = express.Router();
const customersModule = require("../customers");

/* GET home page. */
router.get("/", function (req, res, next) {
  //res.send("another change");
  customersModule.addCustomers("Asaf", "0505555558", "a@a.com", 1);
  customersModule.customersList(req, res);
});

module.exports = router;
