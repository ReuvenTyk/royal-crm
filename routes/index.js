const express = require("express");
const router = express.Router();
const path = require("path");
const mwAuth = require("../middleware/auth");
const auth = require("../controllers/auth");

/* authenication */

router.get("/signin", function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "login.html");
  res.sendFile(filePath);
});

//check the login
router.post("/login", auth.login);

//do logout
router.get("/logout", mwAuth, function (req, res, next) {
  return res
    .clearCookie("access_token")
    .status(200)
    .send("Successfully logged out.");
});

/* GET home page. */
router.get("/", mwAuth, function (req, res, next) {
  res.send("this is the home page. use /customers or /products or /orders");
});

router.get("/chat", mwAuth, function (req, res, next) {
  const filePath = path.join(__dirname, "../client", "chat.html");
  res.sendFile(filePath);
});

module.exports = router;
