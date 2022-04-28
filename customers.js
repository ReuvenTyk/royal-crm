// if doing all file as module

//const customers
module.exports = {
  list: [],

  addCustomers: function () {
    let name = process.argv.slice(2);
    if (!name || name.length === 0) {
      console.log("empty");
      return;
    }

    this.list.push({
      name: name,
      id: this.list.length,
    });
  },

  customersList: function () {
    this.list.forEach((costumer) => {
      console.log(`the name: ${costumer.name} was created`);
    });
  },
};

/* module.exports = customers; */
