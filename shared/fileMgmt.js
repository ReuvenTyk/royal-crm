const path = require("path");
const database = require("../controllers/database");
const fs = require("fs");
module.exports = {
  getHtmlFilePath: function (htmlFileName) {
    return path.join(__dirname, "../client", htmlFileName);
  },

  exportToFie: async function (res, sql, filePrefix) {
    try {
      const result = await database.query(sql);

      const now = new Date().getTime();
      const filePath = path.join(
        __dirname,
        "../files",
        `${filePrefix}-${now}.txt`
      );
      const stream = fs.createWriteStream(filePath);

      stream.on("open", function () {
        stream.write(JSON.stringify(result[0]));
        stream.end();
      });

      stream.on("finish", function () {
        res.send(`Success. file at: ${filePath}`);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
