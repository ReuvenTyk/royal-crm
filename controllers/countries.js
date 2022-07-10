const database = require("./database");

module.exports = {
  countriesList: async function (req, res, next) {
    const sql = `SELECT * From countries ORDER BY name ASC;`;
    try {
      const result = await database.query(sql);
      res.json(result[0]);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
};
