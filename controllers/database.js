//the connection stats - from the configuration file
const config = require("../config/dev");
//open connection to the DB
const mysql = require("mysql2");

//connection pool configuration - the data from the config file
const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

//mySql2 code
async function query(sql, values) {
  //making the connection
  const promisePool = pool.promise();
  //running the query
  return ([row, fields] = await promisePool.query(sql, values));
}

module.exports = {
  //sending the table back as row and files/
  query,
};
