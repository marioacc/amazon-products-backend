const AmazonProductAPI = require('../services/AmazonProductAPI');
const AmazonProductModel = require('../models/AmazonProductModel');
const credentials = {
    accessKey: process.env.PRODUCT_ADVERSTISING_API_ACCESS_KEY,
    secretKey: process.env.PRODUCT_ADVERSTISING_API_SECRET_KEY,
}
const amazonProductAPI = new AmazonProductAPI(credentials, process.env.PRODUCT_ADVERSTISING_API_ASSOCIATE_ID);

/**
 * Returns a json with all first 10 amazon products that matches the
 * param :keyword
 * @param {Object} req 
 * @param {Object} res 
 */
function getAmazonProduct(req, res) {
    console.info(`Looking for "${req.params.keyword}"`)
    amazonProductAPI.performItemSearchByKeyword(req.params.keyword)
        .then(response => {
            res.json(response);
            storeProducts(response);
        })
        .catch(error => res.json(error))
}

/**
 * Stores a set of Amazon Products in the DB
 * @param {Array[AmazonProducts]} products 
 */
function storeProducts(products) {
    console.info('Starting Amazon Products ',products[0])
    AmazonProductModel.collection.insert(products, onInsert)
}

function onInsert(err, docs) {
    if (err) {
        console.error(`💥💥💥💥💥 Error while saving Amazon Products -> ${err}`);
    } else {
        console.info(`${docs.length} Amazon Products Succesfully saved.` );
    }
}

module.exports.getAmazonProduct = getAmazonProduct;