const express = require("express");
const router = express.Router();
const cm = require("../controllers/countries");

router.get("/", cm.countriesList);

module.exports = router;
