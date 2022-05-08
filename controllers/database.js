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

module.exports = {
  pool,
};
