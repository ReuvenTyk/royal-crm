const database = require("./database");

module.exports = {
  //products: [],

  addProduct: async function (req, res, next) {
    const qs = req.query;
    const name = qs.name;
    const description = qs.description;
    const price = qs.price;
    const image = qs.image;

    if (!name || name.length === 0) throw "empty";

    try {
      const result = await database.main(sql, [
        name,
        description,
        price,
        image,
      ]);
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
    /* this.products.push({
      name: productName,
      id: this.products.length,
    }); 

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
      );*/
  },

  productsList: async function (req, res) {
    const sql = "SELECT * FROM products ORDER BY name ASC";

    try {
      //using async function
      /* const connection = await database.getConnection();
      const result = await database.runQuery(connection, sql); */
      //going on mySql2
      const result = await database.main(sql);
      res.send(result[0]);
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

  //todo: export all products to file
  //sql: SELECT
  exportProducts: async function (req, res, next) {
    const sql =
      "SELECT name, description,price FROM products ORDER BY name ASC";
  },
  //todo: delete product
  //sql: DROP
  deleteProduct: async function (req, res, next) {},

  //todo: search product
  //sql: SELECT WHERE
  searchProducts: async function (req, res, next) {},

  //todo: sort products by column
  //sql: SORT BY ASC/DESC

  //todo: edit/update product
  //sql = patch
  editProducts: async function (req, res, next) {},
};
