const database = require("./database");

module.exports = {
  //products: [],

  addProducts: function (name, description, price, image) {
    //let productName = process.argv.slice(2);
    if (!name || name.length === 0) throw "empty";

    /* this.products.push({
      name: productName,
      id: this.products.length,
    }); */

    database.pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;

      const sql =
        "INSERT INTO products(name,description,price,image)" +
        "VALUES(?,?,?,?)";

      connection.query(
        sql,
        [name, description, price, image],
        function (sqlErr, result, fields) {
          if (sqlErr) throw sqlErr;

          console.log(fields);
          console.log(result);
        }
      );
    });
  },

  productsList: async function (req, res) {
    const sql = "SELECT * FROM products";

    try {
      //using async function
      const connection = await database.getConnection();
      const result = await database.runQuery(connection, sql);
      res.send(result);
    } catch (err) {
      console.log(err);
    }

    /* 
    database
      .getConnection()
      .then((connection) => database.runQuery(connection, sql))
      .then((result) => res.send(result))
      .catch((err) => console.log(err)); 
    
    database.pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr; //not connected!

      const sql = "SELECT * FROM products";

      connection.query(sql, function (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        res.send(result);
      });
    }); */
  },
};
