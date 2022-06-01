const path = require("path");
const mongo = require("../controllers/database");
const fs = require("fs");
module.exports = {
  getHtmlFilePath: function (htmlFileName) {
    return path.join(__dirname, "../client", htmlFileName);
  },

  exportToFie: async function (res, collectionName) {
    try {
      const now = new Date().getTime();
      const filePath = path.join(
        __dirname,
        "../files",
        `${collectionName}-${now}.txt`
      );
      const stream = fs.createWriteStream(filePath);

      const database = await mongo.getDB();
      const collection = database.collection(collectionName);

      const cursor = collection.find({});
      await cursor.forEach((doc) => {
        stream.write(JSON.stringify(doc));
      });
      stream.end();

      stream.on("close", function () {
        res.send(`success. file at: ${filePath}`);
      });
      // stream.on("open", function () {
      //   stream.write(JSON.stringify(result[0]));
      //   stream.end();
      // });

      stream.on("finish", function () {
        res.send(`Success. file at: ${filePath}`);
      });
    } catch (err) {
      console.log(err);
    }
  },
};
