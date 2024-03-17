const express = require('express');

const {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteItem,
  postChangeUserIndex,
  postChangeUserProducts,
  postProducts,
  postCreateOrder,
  postOrders,
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);
router.post('/', postChangeUserIndex);

router.get('/products', getProducts);
router.post('/products', postChangeUserProducts);

router.get('/products/:productId', getProduct);
router.post('/products/:productId', postProducts);

router.get('/cart', getCart);
router.post('/cart', postCart);

router.post('/cart-delete-item', postCartDeleteItem);

router.get('/orders', getOrders);
router.post('/orders', postOrders);
router.post('/create-order', postCreateOrder);

router.get('/checkout', getCheckout);

module.exports = router;
