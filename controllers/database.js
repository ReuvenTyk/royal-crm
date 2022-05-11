//the connection stats
const config = require("../config/dev");
//open connection to the DB
const mysql = require("mysql2");

//connection pool configuration
const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

async function main(sql, values) {
  //instead of the getConnection function
  const promisePool = pool.promise();
  //instead of the runQuery function
  return ([row, fields] = await promisePool.query(sql, values));
}

//coming build in mySql2 package
/* function getConnection() {
  return new Promise(function (res, rej) {
    pool.getConnection(function (connErr, connection) {
      if (connErr) rej(connErr); //not connected!
      else res(connection);
    });
  });
}

function runQuery(connection, sql) {
  return new Promise(function (res, rej) {
    //connection to DB and check the query
    connection.query(sql, function (sqlErr, result, fields) {
      if (sqlErr) rej(sqlErr);
      else res(result);
    });
  });
}
 */
module.exports = {
  main,
  /* pool,
  getConnection,
  runQuery, */
};
