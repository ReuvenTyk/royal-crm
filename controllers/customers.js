const database = require("./database");

//const customers
module.exports = {
  //send values
  addCustomers: async function (req, res, next) {
    /* takeing the function parameters out on the ()
    name, phone, email, country_id;
 */

    const qs = req.query;
    const name = qs.name;
    const phone = qs.phone;
    const email = qs.email;
    const country_id = qs.country_id;

    // validation
    if (!name || name.length === 0) {
      throw "name is empty";
    }

    const sql =
      "INSERT INTO customers(name,phone,email,country_id)" + "VALUES(?,?,?,?)";
    try {
      const result = await database.main(sql, [name, phone, email, country_id]); //getting back an array [row,fields]
      res.send(`${name} added successfully`);
    } catch (err) {
      console.log(err);
    }

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

    //using promise
    /* database
      .getConnection()
      .then((connection) => database.runQuery(connection, sql))
      .then((result) => res.send(result))
      .catch((err) => console.log(err)); */

    /*     database.pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr; //not connected!
      
      //get the DB
      const sql = "SELECT * FROM customers";

      //connection to DB and check the query
      connection.query(sql, (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        res.send(result);
      }    )
    }); */
  },

  //todo: delete customer
  //sql: DROP
  deleteCustomer: async function (req, res, next) {},

  //todo: export all customers
  //sql: SELECT
  exportCustomer: async function (req, res, next) {},

  //todo: sort customers bt column
  //sql: SORT BY ASC/DESC

  //todo: edit/update customer
  findCustomer: async function (req, res, next) {},

  //todo: view more details of a customer
  viewCustomersDetails: async function (req, res, next) {},
};

/* module.exports = customers; */
