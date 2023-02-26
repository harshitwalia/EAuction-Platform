/**
 * Created by himanshu on 16/2/17.
 */

var mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://harshit:test123@cluster0.tqfro4n.mongodb.net/';
// Write your functions here and remember to export them.
function AddBookings(customerId, FlightId, callback) {

    mongoClient.connect(url, function (err, client) {

        if(err)
            throw err;
        var db = client.db('myproject');
        var handler = db.collection('bookings');
        handler.insertOne({
            customerId : customerId,
            FlightId : FlightId
        }, function (err, r) {

            if(err)
                throw err;
            else
            {
                console.log("Inserted");
                console.log(r);
            }
            callback();

        });
    });

}

function getBookings(callback) {
    mongoClient.connect(url,function (error,client) {
        if(error)throw error;
        var database = client.db('myproject');
        var handler = database.collection('bookings');
        handler.find({}).toArray(function (err,result) {
            if(err)throw err;
            client.close();
            callback(result);
        })
    })
}

function CheckBooking(id, callback)
{
    mongoClient.connect(url,function (error,client) {
        if(error)
            throw error;
        var database = client.db('myproject');
        var handler = database.collection('bookings');
        handler.find({
            FlightId : id
        }).toArray(function (err,result) {
            if(err)
                throw err;
            client.close();
            if(result.length == 0)
            {
                callback(1);
            }
            else
            {
                callback(0);
            }
        });
    });

}

module.exports = {

    AddBooking : AddBookings,
    getBookings:getBookings,
    CheckBooking : CheckBooking

};