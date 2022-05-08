const config = require("../config/dev");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = {
  //list: [],

  addOrders: function (price, quantity) {
    //let orderName = process.argv.slice(2);
    if (!quantity) throw "empty";

    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr;

      const sql = "INSERT INTO orders(price,quantity)" + "VALUES(?,?)";

      connection.query(
        sql,
        [price, quantity],
        function (sqlErr, result, fields) {
          if (sqlErr) throw sqlErr;

          console.log(fields);
          console.log(result);
        }
      );
    });
  },

  ordersList: function (req, res) {
    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr; //not connected!

      const sql = "SELECT * FROM orders";

      connection.query(sql, function (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        res.send(result);
      });
    });
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
