require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const dbUrl = `mongodb://${process.env.USER}:${process.env.PASSWORD}@ds149865.mlab.com:49865/faust-it-db`;
const createExpressApp = require('./create-express-app');

MongoClient.connect(dbUrl, (err, db) => {
    if (err) {
        console.log(err);
        return;
    }
    const database = db.db('faust-it-db');
    console.log('connected to database');

    createExpressApp(database);
});
