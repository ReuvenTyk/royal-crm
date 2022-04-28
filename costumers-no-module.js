let customers = [];

//for one UserName at a time
function addCustomers() {
  let name = process.argv.slice(2);
  if (!name || name.length === 0) {
    console.log("empty");
    return;
  }

  customers.push({
    name: name,
    id: customers.length,
  });
}

function customersList() {
  customers.forEach((costumer) => {
    console.log(`the name :${costumer} was created`);
  });
}

addCustomers();
customersList();
