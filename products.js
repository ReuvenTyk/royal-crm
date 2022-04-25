//for One product at a time

let products = [];

function addProducts() {
  let productName = process.argv.slice(2);
  if (!productName || productName.length === 0) {
    console.log("empty");
    return;
  }

  products.push({
    name: productName,
    id: products.length,
  });

  products.forEach((product) => {
    console.log(product);
  });
}

addProducts();

/* My solution

let products = [];

function addProducts(product) {
  let arr = [];
  if (product == "") {
    console.log("empty");
    return;
  } else {
    for (let i = 0; i < product.length; i++) {
      arr.push({
        name: product[i],
        id: arr.length,
      });
    }
  }
  return arr;
}

products = addProducts(process.argv.slice(2));

//solution 1
/* for (let i = 0; i < costumers.length; i++) {
  console.log(costumers[i]);
} 

//solution 2
products.forEach((product) => {
  console.log(product);
});
 */
