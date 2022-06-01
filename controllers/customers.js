const joi = require("joi");
const mongo = require("./database");
const fileMgmt = require("../shared/fileMgmt");

module.exports = {
  addCustomer: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      name: joi.string().required().min(2).max(200),
      phone: joi
        .string()
        .required()
        .regex(/^[0-9]{8,11}$/),
      email: joi
        .string()
        .required()
        .regex(/^[^@]+@[^@]+$/),
      countryId: joi.string().required(),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.send(`error adding customer: ${error}`);
      return;
    }

    try {
      const database = await mongo.getDb();
      const collection = database.collection("customers");
      collection.insertOne(value); // { name: '', phone..., email}
      res.json(value);
    } catch (err) {
      console.log(err);
      res.status(400).send(`error adding customer`);
    }
  },

  customersList: async function (req, res, next) {
    const param = req.query; // get method
    //  const param = req.body;  // post method
    try {
      const database = await mongo.getDb();
      const collection = database.collection("customers");

      const result = await collection
        .find({})
        .sort({ name: 1 }) // ASC
        .toArray();

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  exportCustomers: function (req, res, next) {
    fileMgmt.exportToFile(res, "customers");
  },
};
