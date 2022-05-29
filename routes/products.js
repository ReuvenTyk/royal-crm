const express = require("express");
const router = express.Router();
const pm = require("../controllers/products");
const path = require("path");

//http://localhost:3000/products

//products
router.get("/home", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "products-home.html");
  res.sendFile(filePath);
});

router.get("/", pm.productsList);
router.get("/export", pm.exportProducts);
router.post("/", pm.addProduct);
//router.patch("/products", pm.editProducts);
//router.delete("/products", pm.deleteProduct);
//router.get("/products/search/:id", pm.searchProducts);

module.exports = router;
