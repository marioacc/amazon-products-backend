const collectionName = 'amazonproducts';

let conn = new Mongo();
let db = conn.getDB('konfio-test');
db.createUser(
    {
        user: "konfio",
        pwd: "konfio1234",
        roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
    }
)
db.createCollection(collectionName);
db[collectionName].createIndex({ ASIN :1},{unique:true});

