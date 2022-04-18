let orders = [];

function addProducts(order) {
  let arr = [];
  if (order == "") {
    console.log("empty");
    return;
  } else {
    for (let i = 0; i < order.length; i++) {
      arr.push(order[i]);
    }
  }
  return arr;
}

products = addProducts(process.argv.slice(2));

//solution 1
/* for (let i = 0; i < costumers.length; i++) {
  console.log(costumers[i]);
} */

//solution 2
products.forEach((order) => {
  console.log(order);
});
