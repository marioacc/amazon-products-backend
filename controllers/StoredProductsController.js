const AmazonProductModel = require('../models/AmazonProductModel');

function getAllProducts(req,res){
    console.info(`🔎🔎🔎🔎🔎 Getting all the products`)
    AmazonProductModel.find()
    .then(products=>res.json(products))
    .catch(error=>console.error(error))
}



function getProductByASIN(req, res,next) {
    const ASIN = req.params.ASIN;
    console.info(`🔎🔎🔎🔎🔎 Looking for product with ASIN -> ${ASIN}`)
    AmazonProductModel.findOne({ASIN:ASIN})
        .then(products => {
            res.json(products)
            console.log(`Succesfully retrieved ${ASIN} product`);
        })
        .catch(error => {
            console.error(error);
        })
}

function saveProduct(req, res, next) {
    const ASIN = req.params.ASIN;
    const EXISTING_ID_ERROR = 11000;
    console.info(`📦 📦 📦 📦 📦 📦 📦 Saving Product`)
    console.info(req.body);
    const product = new AmazonProductModel(req.body);
    product.save(( error =>{
        if (error && error.code !== EXISTING_ID_ERROR) {
            console.log(error);
            res.status(500).json(error);
        }{
            console.info(`📦 📦 📦 📦 📦 📦 📦 Succesfully added`)
            res.status(200).json(req.body);
        }
        // saved!
    }))
}

function removeProduct(req, res, next) {
    const ASIN = req.params.ASIN;
    console.info(`📦 📦 📦 📦 📦 📦 📦 Removing Product ${req.body.ASIN}`)
    AmazonProductModel({ASIN:req.body.ASIN}).remove((error => {
        if (error && error.code !== EXISTING_ID_ERROR) {
            console.log(error);
            res.status(500).json(error);
        }else{
            console.info(`📦 📦 📦 📦 📦 📦 📦 Succesfully deleted`)
            res.status(200).json(req.body);
        }
        // saved!
    }))
}

module.exports.getAllProducts = getAllProducts;
module.exports.getProductByASIN = getProductByASIN;
module.exports.saveProduct = saveProduct;
module.exports.removeProduct = removeProduct;