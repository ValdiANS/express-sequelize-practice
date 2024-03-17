const express = require('express');

const {
  getAddProduct,
  postAddProduct,
  getAdminProducts,
  deleteProduct,
  getEditProduct,
  postEditProduct,
  getAddUser,
  postUser,
  postFilterAdminProducts,
} = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);
router.post('/add-product', postAddProduct);

router.get('/products', getAdminProducts);
router.post('/products', postFilterAdminProducts);

router.get('/edit-product/:productId', getEditProduct);
router.post('/edit-product/:productId', postEditProduct);

router.post('/delete-product', deleteProduct);

router.get('/add-user', getAddUser);

router.post('/user', postUser);

module.exports = router;
