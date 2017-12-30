let crypto = require('crypto');

var generateSignature = function (stringToSign, awsSecret) {
    var hmac = crypto.createHmac('sha256', awsSecret.toString());
    var signature = hmac.update(stringToSign).digest('base64');
    return signature;
};

function generateQueryString(query, credentials) {
    var domain = 'webservices.amazon.com';
    var path = '/onca/xml';
    // generate query
    let unsignedString = formatQueryParams(query);
    var signature = encodeURIComponent(generateSignature('GET\n' + domain + '\n' + path + '\n' + unsignedString, credentials.secretKey)).replace(/\+/g, '%2B');
    var queryString = 'http://' + domain + path + '?' + unsignedString + '&Signature=' + signature;
    return queryString;
};


/**
 * Creates the query string.
 * @param {Array[String]} queryParams 
 * @returns {String} query string.
 */
function formatQueryParams(queryParams) {
    return Object.keys(queryParams).sort().map(function (key) {
        return key + "=" + encodeParamValue(queryParams[key]);
    }).join("&")
}


/**
 * Encodes the param value and replaces specific characters for their value at base 16.
 * @param {String} paramValue 
 * @returns {String} encoded param value.
 */
function encodeParamValue(paramValue) {
    return encodeURIComponent(paramValue).replace(/[!'()*]/g, function (value) {
        return '%' + value.charCodeAt(0).toString(16);
    })
}

exports.generateQueryString = generateQueryString;