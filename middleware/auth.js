//checks if the token that sent is the same as the password

const jwt = require("jsonwebtoken");
const config = require("../config/dev");

module.exports = (req, res, next) => {
  //const token = req.cookies.access_token; //use auth by cookie
  const token = req.header("x-auth-token"); //use auth by header

  if (!token) res.status(401).send(`Access Denied. go to /signin`);

  try {
    req.user = jwt.verify(token, config.JWT_SECRET);
    next();
  } catch (err) {
    //console.log(err);
    res.status(401).send(`Access Denied. go to /signin`);
  }
};
