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

  productsList: function (req, res) {
    /* this.products.forEach((product) => {
      console.log(`the name: ${product.name} was created`);
    }); */

    database.pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr; //not connected!

      const sql = "SELECT * FROM products";

      connection.query(sql, function (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        res.send(result);
      });
    });
  },
};
