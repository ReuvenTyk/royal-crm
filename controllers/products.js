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

  deleteProduct: async function (req, res, next) {
    const schema = joi.object({
      id: joi.number().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      res.status(400).send("error delete product");
      console.log(error.details[0].message);
      return;
    }

    const sql = `DELETE FROM products WHERE id=?`;

    try {
      const result = await database.query(sql, [value.id]);
      res.json({ id: value.id });
    } catch (err) {
      res.status(400).send("error delete product");
      console.log(err.message);
      return;
    }
  },

  editProducts: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi
      .object({
        // the client needs to send product id
        name: joi.string().min(2).max(100),
        description: joi.string().min(2).max(300),
        price: joi.number(),
        image: joi.string().min(5).max(200),
      })
      .min(1); // at least one change

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.status(400).send(`error update product: ${error}`);
      return;
    }

    /* if validation OK getting back an object
      {name:'',description:''....}--> validated data
    */

    const keys = Object.keys(value); //getting the keys as array of the validated data
    const values = Object.values(value); //getting the value as array of the validated data
    const fields = keys.map((key) => `${key}=?`).join(","); // change the array to ['name=?,description=?...']
    values.push(req.params.id);
    const sql = `UPDATE products SET ${fields} WHERE id=?`;

    try {
      const result = await database.query(sql, values);
      res.jason(value);
    } catch (err) {
      console.log(err);
      return;
    }
  },
};
