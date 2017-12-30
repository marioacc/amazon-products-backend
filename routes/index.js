const express = require('express');
const router = express.Router();
const { getAmazonProduct} = require('../controllers/AmazonProductsControllers');

// Do work here
router.get('/search/:keyword', getAmazonProduct );


module.exports = router;
