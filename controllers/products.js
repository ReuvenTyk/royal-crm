const database = require("./database");
const joi = require("joi");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addProduct: async function (req, res, next) {
    const reqBody = req.body;
    const schema = joi.object({
      name: joi.string().required().min(2).max(100),
      description: joi.string().required().min(2).max(300),
      price: joi.number().required(),
      //image: joi.string(),
    });

    const { error } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding product: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO products(name,description,price)" + "VALUES(?,?,?)";

    try {
      const result = await database.query(sql, [
        reqBody.name,
        reqBody.description,
        reqBody.price,
      ]);
    } catch (err) {
      console.log(err);
      return;
    }
    res.send(`${reqBody.name} added successfully`);
  },

  productsList: async function (req, res) {
    const sql = "SELECT * FROM products ORDER BY name ASC";

    try {
      //using async function
      //going on mySql2
      const result = await database.query(sql);
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },

  //todo: export all products to file
  //sql: SELECT
  exportProducts: function (req, res, next) {
    const sql = "SELECT name,description,price FROM products ORDER BY name ASC";

    fileMgmt.exportToFie(res, sql, "products");
  },
};

//todo: delete product
//sql: DROP
//deleteProduct: async function (req, res, next) {},

//todo: search product
//sql: SELECT WHERE
//searchProducts: async function (req, res, next) {},

//todo: sort products by column
//sql: SORT BY ASC/DESC

//todo: edit/update product
//sql = patch
//editProducts: async function (req, res, next) {},
