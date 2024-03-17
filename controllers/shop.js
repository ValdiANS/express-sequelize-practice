const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Product = require('../models/product');
const User = require('../models/user');
const sequelize = require('../util/database');

exports.getIndex = (req, res, next) => {
  // Product.fetchAll((err, products) => {
  //   res.render('shop/index', {
  //     products,
  //     docTitle: 'Valdi Shop',
  //     path: '/',
  //   });
  // });

  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render('shop/index', {
  //       products: rows,
  //       docTitle: 'Valdi Shop',
  //       path: '/',
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Product.findAll()
  //   .then((products) => {
  //     res.render('shop/index', {
  //       products,
  //       docTitle: 'Valdi Shop',
  //       path: '/',
  //     });
  //   })
  //   .catch((err) => console.log(err));

  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      console.log(users);

      Product.findAll().then((products) => {
        res.render('shop/index', {
          docTitle: 'Valdi Shop',
          path: '/',
          products,
          users,
          selectedUserId: parseInt(users[0].id),
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postChangeUserIndex = (req, res, next) => {
  const { userId } = req.body;

  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      Product.findAll().then((products) => {
        res.render('shop/index', {
          docTitle: 'Valdi Shop',
          path: '/',
          products,
          users,
          selectedUserId: parseInt(userId),
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll((err, products) => {
  //   res.render('shop/product-list', {
  //     products,
  //     docTitle: 'Valdi - Products',
  //     path: '/products',
  //   });
  // });

  // Product.fetchAll()
  //   .then(([rows]) => {
  //     res.render('shop/product-list', {
  //       products: rows,
  //       docTitle: 'Valdi - Products',
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Product.findAll()
  //   .then((products) => {
  //     res.render('shop/product-list', {
  //       products,
  //       docTitle: 'Valdi - Products',
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => console.log(err));

  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      Product.findAll().then((products) => {
        res.render('shop/product-list', {
          docTitle: 'Valdi - Products',
          path: '/products',
          products,
          users,
          selectedUserId: parseInt(users[0].id),
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postChangeUserProducts = (req, res, next) => {
  const { userId } = req.body;

  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      Product.findAll().then((products) => {
        res.render('shop/product-list', {
          docTitle: 'Valdi - Products',
          path: '/products',
          products,
          users,
          selectedUserId: parseInt(userId),
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  // Product.findById(productId)
  //   .then(([rows]) => {
  //     const product = rows[0];

  //     res.render('shop/product-detail', {
  //       product,
  //       docTitle: product.title,
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => console.log(err));

  // Product.findByPk(productId)
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product,
  //       docTitle: product.title,
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => console.log(err));

  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      Product.findByPk(productId).then((product) => {
        res.render('shop/product-detail', {
          product,
          docTitle: product.title,
          path: '/products',
          users,
          selectedUserId: users[0].id,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postProducts = (req, res, next) => {
  const { productId } = req.params;
  const { userId, changeUser, detail } = req.body;

  const changeUserDetailProduct = async () => {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      const product = await Product.findByPk(productId);

      res.render('shop/product-detail', {
        docTitle: product.title,
        path: '/products',
        product,
        users,
        selectedUserId: parseInt(userId),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailProductWithSelectedUser = async () => {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      const product = await Product.findByPk(productId);

      res.render('shop/product-detail', {
        docTitle: product.title,
        path: '/products',
        product,
        users,
        selectedUserId: parseInt(userId),
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (changeUser) {
    changeUserDetailProduct();
    return;
  }

  if (detail) {
    getDetailProductWithSelectedUser();
    return;
  }

  res.redirect(`/products/${productId}`);
};

exports.getCart = (req, res, next) => {
  // let cartProducts = [];
  // let totalPrice = 0;
  // Cart.getProducts((err, cart) => {
  //   totalPrice = cart.totalPrice;
  //
  // Product.fetchAll((err, products) => {
  //   for (const item of cart.products) {
  //     const cartProductIdx = products.findIndex(
  //       (prod) => prod.id === item.id
  //     );
  //
  //     if (cartProductIdx > -1) {
  //       cartProducts.push({
  //         ...products[cartProductIdx],
  //         qty: item.qty,
  //       });
  //     }
  //   }
  //
  //   res.render('shop/cart', {
  //     docTitle: 'Valdi - Cart',
  //     path: '/cart',
  //     products: cartProducts,
  //     totalPrice,
  //   });
  // });
  //
  // Product.fetchAll()
  //   .then(([products, fieldData]) => {
  //     for (const item of cart.products) {
  //       const cartProductIdx = products.findIndex(
  //         (prod) => prod.id === item.id
  //       );
  //       if (cartProductIdx > -1) {
  //         cartProducts.push({
  //           ...products[cartProductIdx],
  //           qty: item.qty,
  //         });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       docTitle: 'Valdi - Cart',
  //       path: '/cart',
  //       products: cartProducts,
  //       totalPrice,
  //     });
  //   })
  //   .catch((err) => console.log(err));
  // });

  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      users[0].getCart().then((cart) => {
        cart.getProducts().then((cartProducts) => {
          const totalPrice = cartProducts.reduce(
            (prevVal, currVal) =>
              prevVal + currVal.price * currVal.cartItem.quantity,
            0
          );

          res.render('shop/cart', {
            docTitle: 'Valdi - Cart',
            path: '/cart',
            products: cartProducts,
            totalPrice,
            users,
            selectedUserId: users[0].id,
          });
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const { productId, userId, changeUser } = req.body;

  // Product.findById(productId, (product) => {
  //   Cart.addProduct(product);
  // });

  const changeUserCart = async () => {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      const selectedUser = await User.findByPk(userId);
      const selectedUserCart = await selectedUser.getCart();
      const selectedUserCartProducts = await selectedUserCart.getProducts({
        attributes: {
          include: [
            [sequelize.literal('price * cartItem.quantity'), 'totalPrice'],
          ],
        },
      });

      const totalPrice = selectedUserCartProducts.reduce(
        (prevVal, currVal) =>
          prevVal + currVal.price * currVal.cartItem.quantity,
        0
      );

      res.render('shop/cart', {
        docTitle: 'Valdi - Cart',
        path: '/cart',
        products: selectedUserCartProducts,
        totalPrice,
        users,
        selectedUserId: parseInt(userId),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToCart = async (prodId = productId) => {
    try {
      // const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      const user = await User.findByPk(userId);
      const userCart = await user.getCart();
      const desiredProduct = await Product.findByPk(prodId);
      let desiredProductQuantity = 1;
      const isDesiredProductAlreadyInCart = await userCart.hasProduct(
        desiredProduct
      );

      if (isDesiredProductAlreadyInCart) {
        const existingProductsArr = await userCart.getProducts({
          where: { id: prodId },
        });
        const existingProduct = existingProductsArr[0];

        desiredProductQuantity += existingProduct.cartItem.quantity;
      }

      await userCart.addProduct(desiredProduct, {
        through: { quantity: desiredProductQuantity },
      });

      // const userCartProducts = await userCart.getProducts();

      // res.render('shop/cart', {
      //   docTitle: 'Valdi - Cart',
      //   path: '/cart',
      //   products: userCartProducts,
      //   totalPrice: 0,
      //   users,
      //   selectedUserId: parseInt(userId),
      // });

      res.redirect('/cart');
      return;
    } catch (error) {
      console.log(error);
    }
  };

  if (changeUser) {
    changeUserCart();
    return;
  }

  addProductToCart(productId);

  // res.redirect('/cart');
};

exports.postCartDeleteItem = (req, res, next) => {
  const { productId, userId } = req.body;

  // Product.findById(productId, (product) => {
  //   Cart.deleteProduct(productId, product.price, (err) => {
  //     res.redirect('/cart');
  //   });
  // });

  const deleteCartItem = async () => {
    try {
      const user = await User.findByPk(userId);
      const userCart = await user.getCart();
      const userCartProducts = await userCart.getProducts({
        where: { id: productId },
      });
      const deletedProductTarget = userCartProducts[0];

      if (!deletedProductTarget) return;

      await deletedProductTarget.cartItem.destroy();

      res.redirect('/cart');
    } catch (error) {
      console.log(error);
    }
  };

  deleteCartItem();
};

exports.postCreateOrder = (req, res, next) => {
  const { userId } = req.body;

  const createOrder = async () => {
    try {
      const user = await User.findByPk(userId);
      const userCart = await user.getCart();
      const userCartProducts = await userCart.getProducts();
      const userOrder = await user.createOrder();

      await userOrder.addProducts(
        userCartProducts.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        })
      );

      await userCart.setProducts([]);
      res.redirect('/orders');
    } catch (error) {
      console.log(error);
    }
  };

  createOrder();
};

exports.getOrders = (req, res, next) => {
  // res.render('shop/orders', {
  //   docTitle: 'Valdi - Orders',
  //   path: '/orders',
  // });

  const getOrders = async () => {
    try {
      const allUsers = await User.findAll({
        attributes: ['id', 'name', 'email'],
      });
      const firstUser = allUsers[0];
      const firstUserOrders = await firstUser.getOrders({
        include: {
          model: Product,
        },
      });

      const totalPrice = firstUserOrders.reduce((prevVal, currVal) => {
        const currentOrderTotalPrice = currVal.products.reduce(
          (orderTotalPrice, currProductVal) =>
            orderTotalPrice +
            currProductVal.price * currProductVal.orderItem.quantity,
          0
        );

        return prevVal + currentOrderTotalPrice;
      }, 0);

      res.render('shop/orders', {
        docTitle: 'Valdi - Orders',
        path: '/orders',
        users: allUsers,
        selectedUserId: firstUser.id,
        orders: firstUserOrders,
        totalPrice,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getOrders();
};

exports.postOrders = (req, res, next) => {
  const { userId, changeUser } = req.body;

  const changeUserOrders = async () => {
    try {
      const allUsers = await User.findAll({
        attributes: ['id', 'name', 'email'],
      });
      const selectedUser = await User.findByPk(userId);
      const selectedUserOrders = await selectedUser.getOrders({
        include: {
          model: Product,
        },
      });

      const totalPrice = selectedUserOrders.reduce((prevVal, currVal) => {
        const currentOrderTotalPrice = currVal.products.reduce(
          (orderTotalPrice, currProductVal) =>
            orderTotalPrice +
            currProductVal.price * currProductVal.orderItem.quantity,
          0
        );

        return prevVal + currentOrderTotalPrice;
      }, 0);

      res.render('shop/orders', {
        docTitle: 'Valdi - Orders',
        path: '/orders',
        users: allUsers,
        selectedUserId: selectedUser.id,
        orders: selectedUserOrders,
        totalPrice,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (changeUser) {
    changeUserOrders();
    return;
  }
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Valdi - Checkout',
    path: '/checkout',
  });
};
