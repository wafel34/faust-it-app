require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const dbUrl = `mongodb://${process.env.USER}:${process.env.PASSWORD}@ds149865.mlab.com:49865/faust-it-db`;
const groups = require('./groups.json');
const users = require('./users.json');


function seedDatabase (collectionName, data) {
    MongoClient.connect(dbUrl, (err, db) => {
        const database = db.db('faust-it-db');
        if (err) {
            console.log(err);
            return;
        }

        console.log('connected to database');
        const collection = database.collection(collectionName);
        collection.remove();


        collection.insertMany(data, ()=>{
            console.log('records inserted...');
        });

        db.close();
        console.log('database closed...');
    });

}

seedDatabase('users', users);
seedDatabase('groups', groups);
