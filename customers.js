let products = [];

function addProducts(user) {
  let arr = [];
  if (user == "") {
    console.log("empty");
    return;
  } else {
    for (let i = 0; i < user.length; i++) {
      let obj = {
        username: user[i],
        password: `${user[i]}1`,
      };
      arr.push(obj);
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
products.forEach((costumer) => {
  console.log(costumer);
});
