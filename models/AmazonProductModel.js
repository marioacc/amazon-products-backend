var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AmazonProductSchema = new Schema({
    "ASIN": [String],
    "ParentASIN": [String],
    "DetailPageURL": [String],
    "ItemLinks": [{
        "ItemLink": [{
            "Description": [String],
            "URL": [String]
        }]
    }],
    "ItemAttributes": [{
        "Manufacturer": [String],
        "ProductGroup": [String],
        "Title": [String],
    }],
});

module.exports = mongoose.model('AmazonProducts', AmazonProductSchema);