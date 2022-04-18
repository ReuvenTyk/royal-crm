let products = [];

function addProducts(product) {
  let arr = [];
  if (product == "") {
    console.log("empty");
    return;
  } else {
    for (let i = 0; i < product.length; i++) {
      arr.push(product[i]);
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
products.forEach((product) => {
  console.log(product);
});
