const express = require('express');
const router = express.Router();
const {getAllProducts,getProductByASIN,saveProduct,removeProduct} = require('../controllers/StoredProductsController');

// Do work here
router.get('/all', getAllProducts);

router.get('/:ASIN', getProductByASIN)

router.post('/',saveProduct);
router.delete('/', removeProduct);

module.exports = router;
