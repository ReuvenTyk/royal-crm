const joi = require("joi");
const database = require("./database");
const fs = require("fs");
const path = require("path");
//const customers
module.exports = {
  //send values
  addCustomers: async function (req, res, next) {
    //asking for the parameter from the body of the HTML into qs
    /* const qs = req.body;
    const name = qs.name;
    const phone = qs.phone;
    const email = qs.email;
    const country_id = qs.country; 
    // validation
    if (!name || name.length === 0) {
      throw "name is empty";
    }*/
    //using joi package for validation
    const reqBody = req.body;
    const schema = joi.object({
      name: joi.string().required().min(2).max(200),
      phone: joi
        .string()
        .required()
        .regex(/^[0-9]\d{8,11}$/),
      email: joi.string().required(),
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
      const result = await database.main(sql, [
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

    //going to mySql2
    //open connection to the DB
    /*  database.pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr; //not connected!

      //write query
      const sql =
        "INSERT INTO customers(name,phone,email,country_id)" +
        "VALUES(?,?,?,?)";

      //check in DB
      connection.query(
        sql,
        [name, phone, email, country_id],
        function (sqlErr, result, fields) {
          if (sqlErr) throw sqlErr;

          console.log(fields);
          console.log(result);
        }
      );
    }); */
  },

  customersList: async function (req, res, next) {
    //get the DB
    const sql =
      "SELECT customers.name AS name, customers.phone AS phone, customers.email AS email, countries.name AS country_name, countries.country_code AS country_code FROM customers JOIN countries ON customers.country_id = countries.id";

    try {
      //using async function
      /* const connection = await database.getConnection();
      const result = await database.runQuery(connection, sql); */
      //going to mySql2 promise func
      const result = await database.main(sql); //getting back an array
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
  },

  //todo: export all customers to file
  //sql: SELECT
  exportCustomer: async function (req, res, next) {
    const sql =
      "SELECT customers.name, customers.phone, customers.email, countries.name AS country_name, countries.country_code AS country_code FROM customers JOIN countries ON customers.country_id = countries.id ORDER BY customers.name ASC";
    try {
      const result = await database.main(sql);

      const now = new Date().getTime();
      const filePath = path.join(__dirname, "../files", `customers-${now}.txt`);
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

  //todo: delete customer
  //sql: DROP
  deleteCustomer: async function (req, res, next) {},

  //todo: sort customers bt column
  //sql: SORT BY ASC/DESC

  //todo: edit/update customer
  findCustomer: async function (req, res, next) {},

  //todo: view more details of a customer
  viewCustomersDetails: async function (req, res, next) {},
};

/* module.exports = customers; */
