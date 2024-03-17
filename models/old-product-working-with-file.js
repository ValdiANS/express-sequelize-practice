const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const { randomUUID } = require('crypto');

const p = path.join(rootDir, 'data', 'products.json');
const Cart = require('./cart');

const getProductsFile = (callback = (err, fileContent) => {}) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback(err, []);
      return;
    }

    callback(null, JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFile((err, fileContent) => {
      const products = fileContent;

      if (this.id) {
        const existingProductIdx = products.findIndex(
          (item) => item.id === this.id
        );

        products[existingProductIdx] = { ...this };
      } else {
        this.id = randomUUID();
        products.push(this);
      }

      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static deleteById(productId = '') {
    getProductsFile((err, fileContent) => {
      const products = fileContent;

      const deletedProduct = products.find((item) => item.id === productId);

      const newProducts = products.filter(
        (product) => product.id !== productId
      );

      fs.writeFile(p, JSON.stringify(newProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(productId, deletedProduct.price);
        }
      });
    });
  }

  static fetchAll(callback = (err, data = []) => {}) {
    getProductsFile(callback);
  }

  static findById(id, callback = (product = new Product()) => {}) {
    getProductsFile((err, products) => {
      const product = products.find((item) => item.id === id);

      callback(product);
    });
  }
};
