const database = require("./database");

module.exports = {
  //list: [],

  addOrders: async function (req, res, next) {
    //let orderName = process.argv.slice(2);
    const qs = req.query;
    const price = qs.price;
    const quantity = qs.quantity;

    if (!quantity) throw "empty";
    try {
      const result = await database.main(sql, [price, quantity]);
      res.send(result[0]);
    } catch (err) {
      console.log(err);
    }
    /* database.pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;

      const sql =
        "INSERT INTO orders(customer_id,product_id,price,quantity)" +
        "VALUES(?,?,?,?)";

      connection.query(
        sql,
        [price, quantity],
        function (sqlErr, result, fields) {
          if (sqlErr) throw sqlErr;

          console.log(fields);
          console.log(result);
        }
      );
    }); */
  },

  ordersList: async function (req, res) {
    const sql = "SELECT * FROM orders";
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

    /* database.pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr; //not connected!

      const sql = "SELECT * FROM orders";

      connection.query(sql, function (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        res.send(result);
      });
    }); */
  },
};

/*My solution multi list
 let list = [];

function addOrders(order) {
  let arr = [];
  if (order == "") {
    console.log("empty");
    return;
  } else {
    for (let i = 0; i < order.length; i++) {
      arr.push({
        name: order[i],
        id: arr.length,
      });
    }
  }
  return arr;
}

products = addOrders(process.argv.slice(2));

list.forEach((order) => {
  console.log(order);
});
 */
