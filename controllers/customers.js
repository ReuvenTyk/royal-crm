const database = require("./database");

//const customers
module.exports = {
  //send values
  addCustomers: function (name, phone, email, country_id) {
    // validation
    if (!name || name.length === 0) {
      console.log("empty");
      return;
    }
    //open connection to the DB
    database.pool.getConnection(function (connErr, connection) {
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
    });
  },

  customersList: async function (req, res) {
    //get the DB
    const sql = "SELECT * FROM customers";

    try {
      //using async function
      const connection = await database.getConnection();
      const result = await database.runQuery(connection, sql);
      res.send(result);
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
};

/* module.exports = customers; */
