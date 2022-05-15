const express = require("express");
const router = express.Router();
const cm = require("../controllers/customers");
const productsModule = require("../controllers/products");
const ordersModule = require("../controllers/orders");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("this is the home page. use /customers or /products or /orders");
});
//customers
router.get("/customers-home", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "customers-home.html");
  res.sendFile(filePath);
});
router.get("/customers", cm.customersList);
router.post("/customers", cm.addCustomers);

//todo: delete customer
//router.delete("/customers",cm.deleteCustomer)

//todo: export all customers
router.get("/customers/export", cm.exportCustomer);

//todo: sort customers by column
//router.put("/customers");

//todo: edit/update customer
//router.patch("/customers",cm.findCustomer)

//todo: view more details of a customer
//router.get("/customer-details",cm.viewCustomersDetails)

//products
router.get("/products", productsModule.productsList);
router.get("/products-add", productsModule.addProducts);
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
