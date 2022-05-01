// if doing all file as module
const config = require("./config/dev");
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

//const customers
module.exports = {
  //list: [],

  addCustomers: function (name, phone, email, country_id) {
    //let name = process.argv.slice(2);
    if (!name || name.length === 0) {
      console.log("empty");
      return;
    }

    /* this.list.push({
      name: name,
      id: this.list.length,
    }); */

    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr; //not connected!

      /* const sql =
        "INSERT INTO customers(name,phone,email,country_id)" +
        " VALUES('" + name + "','" + phone + "','" + mail + "','" +country_id +"')"; */

      const sql =
        "INSERT INTO customers(name,phone,email,country_id)" +
        "VALUES(?,?,?,?)";

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

  customersList: function (req, res) {
    /* this.list.forEach((costumer) => {
      console.log(`the name: ${costumer.name} was created`);
    }); */

    pool.getConnection(function (connErr, connection) {
      if (connErr) throw connErr; //not connected!

      const sql = "SELECT * FROM customers";

      connection.query(sql, function (sqlErr, result, fields) {
        if (sqlErr) throw sqlErr;

        res.send(result);
      });
    });
  },
};

/* module.exports = customers; */
