/**
 * Created by himanshu on 16/2/17.
 */


var mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://harshit:test123@cluster0.tqfro4n.mongodb.net/';

// Write your functions here and remember to export them.

function Login(obj, callback) {

    mongoClient.connect(url, function (err, client) {

        if(err)
            throw err;
        var db = client.db('myproject');
        var handler = db.collection('customer');
        handler.find({username : obj.username}).toArray(function (err, docs) {

            if(err)
                throw err;
            console.log(docs);
            if(docs.length == 0)
            {
                callback(0, null); // Indication for not existence of username.
            }
            else if(docs[0].password != obj.password)
            {

                callback(1, null); // For wrong password
            }
            else
            {
                callback(2, docs[0].customerId); // Correctness;
            }

        });
    });
}

function SignUp(obj, callback) {

    mongoClient.connect(url, function (err, client) {


        if(err)
            throw err;
        var db = client.db('myproject');
        var handler = db.collection('customer');
        handler.find({}).toArray(function (err, docs) {

            if(err)
                throw err;
            obj.customerId = docs.length + 1;
            handler.find({username : obj.username}).toArray(function (err, docs) {

                if(err)
                    throw err;
                if(docs.length)
                {
                    callback(0, null); // Username already exits
                }
                else
                {
                    handler.insertOne(obj, function (err, r) {

                            if(err)
                                throw err;
                            callback(1, obj.customerId);
                        }
                    )
                }

            })
        });
    });
}

function Profile(obj, callback) {

    mongoClient.connect(url, function (err, client) {

        if(err)
            throw err;
        var db = client.db('myproject');
        var handler = db.collection('customer');
        handler.find({username : obj.username}).toArray(function (err, docs) {

            if(err)
                throw err;

            if(docs.length == 0)
            {
                callback(0 ,null);
            }
            else
            {
                callback(1, docs[0]);
            }



        });


    });
}

function getCustomers(callback) {

    mongoClient.connect(url,function (error,client) {
        if(error)throw error;
        var database = client.db('myproject');
        var handler = database.collection('customer');
        handler.find({}).toArray(function (err,result) {
            client.close();
            callback(result);
        });
    });
}

module.exports = {
    login : Login,
    signUp : SignUp,
    GetProfile : Profile,
    getCustomers:getCustomers
};