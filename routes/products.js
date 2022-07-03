const express = require("express");
const router = express.Router();
const pm = require("../controllers/products");
const path = require("path");
const fileMgmt = require("../shared/fileMgmt");

//${environment.serverUrl}/products

//products
router.get("/home", function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath("products-home.html");
  res.sendFile(filePath);
});

router.get("/", pm.productsList);
router.get("/export", pm.exportProducts);
router.post("/", pm.addProduct);
router.put("/:id", pm.editProducts);
router.delete("/:id", pm.deleteProduct); //sending product id
//router.get("/products/search/:id", pm.searchProducts);

module.exports = router;
