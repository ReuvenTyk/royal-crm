//for One order at a time

let orders = [];

function addOrders() {
  let orderName = process.argv.slice(2);
  if (!orderName || orderName.length === 0) {
    console.log("empty");
    return;
  }

  orders.push({
    name: orderName,
    id: orders.length,
  });

  orders.forEach((order) => {
    console.log(order);
  });
}

addOrders();

/*My solution multi orders
 let orders = [];

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

orders.forEach((order) => {
  console.log(order);
});
 */
