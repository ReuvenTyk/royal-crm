const joi = require("joi");
const database = require("./database");
const fs = require("fs");
const path = require("path");

module.exports = {
  /* addOrders: async function (req, res, next) {
    //using joi package for validation
    const reqBody = req.body;
    const schema = joi.object({
      customer_id: joi.number().required(),
      price: joi.number().required(),
      quantity: joi.number().required(),
      product_name: joi.string().required().min(2).max(100),
      product_desc: joi.string().required().min(2).max(300),
      product_image: joi.string(),
    });

    const { error } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding order: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO orders(customer_id,price,quantity,product_name,product_desc,product_image)" +
      "VALUES(?,?,?,?,?)";
    try {
      const result = await database.query(sql, [
        reqBody.customer_id,
        reqBody.price,
        reqBody.quantity,
        reqBody.product_name,
        reqBody.product_desc,
        reqBody.product_image,
      ]); //getting back an array [row,fields]
    } catch (err) {
      console.log(err);
      return;
    }
    res.send(`${reqBody.name} added successfully`);
  }, */

  ordersList: async function (req, res) {
    const sql =
      "SELECT orders.id, orders.order_time, orders.price, orders.quantity, " +
      "orders.product_name, orders.product_desc, orders.product_image, customers.id AS customer_id, " +
      "customers.name, customers.phone, customers.email FROM orders orders LEFT JOIN customers customers " +
      "ON orders.id = customers.id ORDER BY orders.id ASC;";
    try {
      const result = await database.query(sql);
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },

  exportOrders: async function (req, res, next) {
    const sql =
      "SELECT orders.order_time, orders.price, orders.quantity, " +
      "orders.product_name, orders.product_desc, orders.product_image, " +
      "customers.name, customers.phone, customers.email FROM orders orders LEFT JOIN customers customers " +
      "ON orders.id = customers.id ORDER BY orders.id ASC;";

    try {
      const result = await database.query(sql);

      const now = new Date().getTime();
      const filePath = path.join(__dirname, "../files", `orders-${now}.txt`);
      const stream = fs.createWriteStream(filePath);

      stream.on("open", function () {
        stream.write(JSON.stringify(result[0]));
        stream.end();
      });

      stream.on("finish", function () {
        res.send(`Success. file at: ${filePath}`);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
