//the connection stats
const config = require("../config/dev");
//open connection to the DB
const mysql = require("mysql2");

//connection pool stats
const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

function getConnection() {
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

module.exports = {
  pool,
  getConnection,
  runQuery,
};
