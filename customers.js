let customers = [];

//for one UserName at a time
function addCustomers() {
  let username = process.argv.slice(2);
  if (!username || username.length === 0) {
    console.log("empty");
    return;
  }
  const tempPass = Math.floor(Math.random() * 1000000);

  customers.push({
    username: username,
    password: tempPass,
  });

  customers.forEach((costumer) => {
    console.log(costumer);
  });
}

addCustomers();
