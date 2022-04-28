//for One order at a time
module.exports = {
  list: [],

  addOrders: function () {
    let orderName = process.argv.slice(2);
    if (!orderName || orderName.length === 0) {
      console.log("empty");
      return;
    }

    this.list.push({
      name: orderName,
      id: this.list.length,
    });
  },

  ordersList: function () {
    this.list.forEach((order) => {
      console.log(`the name: ${order.name} was created`);
    });
  },
};

/*My solution multi list
 let list = [];

function addOrders(order) {
  let arr = [];
  if (order == "") {
    console.log("empty");
    return;
  } else {
    for (let i = 0; i < order.length; i++) {
      arr.push({
        name: order[i],
        id: arr.length,
      });
    }
  }
  return arr;
}

products = addOrders(process.argv.slice(2));

list.forEach((order) => {
  console.log(order);
});
 */
