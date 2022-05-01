//for One product at a time
module.exports = {
  products: [],

  addProducts: function () {
    let productName = process.argv.slice(2);
    if (!productName || productName.length === 0) {
      console.log("empty");
      return;
    }

    this.products.push({
      name: productName,
      id: this.products.length,
    });
  },

  productsList: function () {
    this.products.forEach((product) => {
      console.log(`the name: ${product.name} was created`);
    });
  },
};
