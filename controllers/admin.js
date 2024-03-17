const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      res.render('admin/edit-product', {
        docTitle: 'Valdi - Add Product',
        path: '/admin/add-product',
        users,
        editing: false,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price, userId } = req.body;
  // const product = new Product(title, imageUrl, description, price);

  // product
  //   .save()
  //   .then(() => {
  //     // res.redirect('/');
  //     res.redirect('/products');
  //   })
  //   .catch((err) => console.log(err));

  // Product.create({ title, price, description, imageUrl, userId })
  //   .then((result) => {
  //     console.log(result);
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => console.log(err));

  User.findByPk(userId)
    .then((user) => {
      return user.createProduct({ title, price, description, imageUrl });
    })
    .then((result) => {
      console.log(result);
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const { productId } = req.params;
  const { edit: editMode } = req.query;

  if (editMode !== 'true') {
    return res.redirect('/');
  }

  // Product.findById(productId, (product) => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }

  //   res.render('admin/edit-product', {
  //     docTitle: 'Valdi - Edit Product',
  //     path: '/admin/edit-product',
  //     editing: new Boolean(editMode),
  //     product,
  //   });
  // });

  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        docTitle: 'Valdi - Edit Product',
        path: '/admin/edit-product',
        editing: new Boolean(editMode),
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId } = req.params;
  const { title, imageUrl, description, price } = req.body;

  // const editedProduct = new Product(title, imageUrl, description, price);

  // editedProduct
  //   .save()
  //   .then(() => {
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => console.log(err));

  Product.update(
    {
      title,
      price,
      description,
      imageUrl,
    },
    {
      where: {
        id: productId,
      },
    }
  )
    .then(([affectedCount]) => {
      if (affectedCount === 1) {
        res.redirect('/admin/products');
      }
    })
    .catch((err) => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  // Product.fetchAll()
  //   .then(([rows]) => {
  //     res.render('admin/admin-product-list', {
  //       docTitle: 'Valdi - Admin Products',
  //       path: '/admin/products',
  //       products: rows,
  //     });
  //   })
  //   .catch((err) => console.log(err));

  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      Product.findAll().then((products) => {
        res.render('admin/admin-product-list', {
          docTitle: 'Valdi - Admin Products',
          path: '/admin/products',
          products,
          users,
          selectedUserId: null,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postFilterAdminProducts = (req, res, next) => {
  const { userId } = req.body;

  console.log(`userId: ${userId}`);

  if (!userId) {
    res.redirect('/admin/products');
    return;
  }

  User.findAll({
    attributes: ['id', 'name', 'email'],
  })
    .then((users) => {
      User.findByPk(userId).then((user) => {
        user.getProducts().then((products) => {
          res.render('admin/admin-product-list', {
            docTitle: 'Valdi - Admin Products',
            path: '/admin/products',
            products,
            users,
            selectedUserId: parseInt(userId),
          });
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.body;

  // Product.deleteById(productId);

  Product.destroy({
    where: {
      id: productId,
    },
    limit: 1,
  });

  res.redirect('/products');
};

exports.getAddUser = (req, res, next) => {
  res.render('admin/add-user', {
    docTitle: 'Create User',
    path: '/admin/add-user',
  });
};

exports.postUser = (req, res, next) => {
  const { name, email } = req.body;

  User.create({
    name,
    email,
  })
    .then((user) => {
      return user.createCart();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};
