const fs = require('fs');
const path = require('path');
const Product = require('./product');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

class Cart {
  static getProducts(callback = (err, cart) => {}) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback(err, {});
        return;
      }

      callback(null, JSON.parse(fileContent));
    });
  }

  static addProduct(product = new Product()) {
    const addedProduct = {
      id: product.id,
      qty: 1,
    };

    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      const existingProductIdx = cart.products.findIndex(
        (item) => item.id === addedProduct.id
      );

      console.log(existingProductIdx);

      // Add new product or increase quantity
      if (existingProductIdx > -1) {
        cart.products[existingProductIdx].qty += 1;
      } else {
        cart.products = [...cart.products, addedProduct];
      }

      cart.totalPrice += parseFloat(product.price);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice, callback = (err) => {}) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return;

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((item) => item.id === id);

      if (!product) {
        return;
      }

      updatedCart.products = updatedCart.products.filter(
        (item) => item.id !== id
      );
      updatedCart.totalPrice -= parseFloat(productPrice) * product.qty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        callback(err);
      });
    });
  }
}

module.exports = Cart;
