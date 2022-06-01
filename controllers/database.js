//the connection stats - from the configuration file
const config = require("../config/dev");
//open connection to the DB
const { MongoClient } = require("mongodb");

//connection pool configuration - the data from the config file
const client = new MongoClient(config.MONGO_HOST); //connection url
let db = undefined;

async function getDb() {
  if (db) return db;

  await client.connect();
  return client.db(config.MONGO_DB);
}

module.exports = {
  getDB,
};
