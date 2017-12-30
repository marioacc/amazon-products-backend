let axios = require('axios');
let generateQueryString = require('./utils').generateQueryString;
var xml2JsonParser = new require('xml2js').Parser(({ attrkey: 'attr$' })).parseString;

class AmazonProductAPI {

    constructor(credentials, associateTag) {

        this.credentials = credentials;
        this.associateTag = associateTag;
        this.baseQueryParams = {
            Service: 'AWSECommerceService',
            AssociateTag: associateTag,
            AWSAccessKeyId: credentials.accessKey,
            SearchIndex: 'All',
        }
    }

    /**
     * Performs a search by keyword
     * @param {String} keyword keyword to look for.
     * @returns {Promise} promise with the 
     */
    performItemSearchByKeyword(keyword) {
        let searchParams = this._clone(this.baseQueryParams);
        searchParams['Timestamp'] = new Date().toISOString();
        searchParams['Keywords'] = keyword;
        searchParams['Operation'] = 'ItemSearch'
        var BASE_URL = generateQueryString(searchParams, this.credentials)
        return axios.get(BASE_URL).then(response =>{
            let data = response.data;
            console.info(BASE_URL)
            return this._xmlParser(data);
        }).then(parsedData => {
            const itemsFound = parsedData.ItemSearchResponse.Items[0].Item;
            return itemsFound;
        })
    }
    _clone(objetoToClone) {
        let queryParams = {};
        for (let paramName in this.baseQueryParams) {
            queryParams[paramName] = this.baseQueryParams[paramName];
        }
        return queryParams;
    }

    _xmlParser(xmlString) {
        return new Promise((resolve, reject) => {
            xml2JsonParser(xmlString, (error, parsedData) => {
                if (!error) {
                    resolve(parsedData)
                }
                reject(error);
            });
        })
    }
}

module.exports = AmazonProductAPI;