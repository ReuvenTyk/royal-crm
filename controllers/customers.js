const joi = require("joi");
const database = require("./database");
const fileMgmt = require("../shared/fileMgmt");

//const customers
module.exports = {
  //send values
  addCustomers: async function (req, res, next) {
    //using joi package for validation
    const reqBody = req.body;
    const schema = joi.object({
      name: joi.string().required().min(2).max(200),
      phone: joi
        .string()
        .required()
        .regex(/^[0-9]\d{8,11}$/),
      email: joi
        .string()
        .required()
        .regex(/^[^@]+@[^@]+$/),
      country_id: joi.number().required(),
    });

    const { error } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding customer: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO customers(name,phone,email,country_id)" + "VALUES(?,?,?,?)";
    try {
      const result = await database.query(sql, [
        reqBody.name,
        reqBody.phone,
        reqBody.email,
        reqBody.country_id,
      ]); //getting back an array [row,fields]
    } catch (err) {
      console.log(err);
      return;
    }
    res.send(`${reqBody.name} added successfully`);
  },

  customersList: async function (req, res, next) {
    const param = req.query; // get method
    //const param = req.body;// post method

    const schema = joi.object({
      column: joi.string().valid("name", "email", "country_id").default("name"),
      sort: joi.string().valid("ASC", "DESC").default("ASC"),
    });

    const { error, value } = schema.validate(param);

    if (error) {
      res.status(400).send("add failed");
      throw error;
    }
    /* 
      mapping:
      if the key then give me the value

      example:
      fieldsMap.get('email'); =>'customer.email
    */

    const fieldMap = new Map([
      // key , value
      ["name", "customers.name"],
      ["email", "customers.email"],
      ["country_id", "customers.country_id"],
    ]);

    //get the DB
    const sql = `SELECT customers.name AS name, customers.phone AS phone, customers.email AS email, countries.name AS country_name, countries.country_code AS country_code FROM customers JOIN countries ON customers.country_id = countries.id 
    ORDER BY ${fieldMap.get(value.column)} ${value.sort}`;

    try {
      //going to mySql2 promise func
      const result = await database.query(sql); //getting back an array

      res.json(result[0]);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  //export all customers to file
  exportCustomer: function (req, res, next) {
    const sql =
      "SELECT customers.name, customers.phone, customers.email, countries.name AS country_name, countries.country_code AS country_code FROM customers customers JOIN countries ON customers.country_id = countries.id ORDER BY customers.name ASC";

    fileMgmt.exportToFie(res, sql, "customers");
  },
  // search in customers by parameters
  findCustomer: async function (req, res, next) {
    const param = req.query;

    const schema = joi.object({
      //the name that we'll right in the name at the HTML
      search: joi.string().required().min(2),
    });

    const { error, value } = schema.validate(param);

    if (error) {
      res.status(400).send(`Search in Invalid: ${error}`);
      throw error;
    }

    const searchQuery = `%${value.search}%`;

    const sql = `SELECT customers.name AS name, customers.phone AS phone, customers.email AS email, countries.name AS country_name, countries.country_code AS country_code FROM customers JOIN countries ON customers.country_id = countries.id 
    WHERE customers.name LIKE ? OR customers.email LIKE ? OR country_id LIKE ?
    ORDER BY customers.name ASC; `;

    try {
      const result = await database.query(sql, [
        //checking each ? in the sql above
        searchQuery,
        searchQuery,
        searchQuery,
      ]);
      res.json(result[0]);
    } catch (err) {
      res.status(400).send(`Search in Invalid: ${error}`);
      throw error;
    }
  },

  //todo: delete customer
  //sql: DROP
  deleteCustomer: async function (req, res, next) {},

  //todo: edit/update customer
  updateCustomer: async function (req, res, next) {},

  //todo: view more details of a customer
  viewCustomersDetails: async function (req, res, next) {},
};
