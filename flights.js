var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
const url = 'mongodb+srv://harshit:test123@cluster0.tqfro4n.mongodb.net/';
function GetDetails(obj, callback)
{
    mongoClient.connect(url, function (err, client) {

        if(err)
            throw err;
        var db = client.db('myproject');
        var handler = db.collection('flight');
        handler.find(
            {
                source : obj.source,
                destination : obj.destination,
                date : obj.date
            })
            .toArray(function (err, docs ) {

                callback(docs);

        })

    });
}

function GetDetailsUsingId(id, callback) {

    mongoClient.connect(url, function (err, client) {

        if(err)
            throw err;
        var db = client.db('myproject');
        var handler = db.collection('flight');
        handler.find({flightId : id}).toArray(function (err, docs) {

            if(err)
                throw err;

            if(docs.length == 0)
            {
                callback(0, docs);
            }
            else
            {
                callback(1, docs);
            }
        });
    });
}

function BookFlight(id, callback) {

    mongoClient.connect(url, function (err, client) {

        if(err)
            throw err;
        var db = client.db('myproject');
        var handler = db.collection('flight');
        handler.find({flightId : id}).toArray(function (err, docs) {

            if(err)
                throw err;

            if(docs.length == 0)
            {
                callback(0, docs);
            }
            else
            {
                if(docs[0].totalAvailable == 0)
                {
                    callback(1, docs);
                }
                else
                {
                    --docs[0].totalAvailable;
                    handler.updateOne({flightId : id}, {$set : docs[0]}, function (err, r) {
                        if (err)
                            throw err;

                        console.log("Updated");
                        console.log(r);
                        callback(2, docs);

                    });
                }
            }

        });

    });
}



function getAllFlights(callback) {

    mongoClient.connect(url,function (error,client) {
        if(error)throw error;
        var database = client.db('myproject');
        var handler = database.collection('flight');
        handler.find({}).toArray(function (err,result) {
            client.close();
            callback(result);
        });
    });
}


function getAllFlightsDuplicate(callback) {

    mongoClient.connect(url,function (error,client) {
        if(error)throw error;
        var database = client.db('myproject');
        var handler = database.collection('flight-duplicate');
        handler.find({}).toArray(function (err,result) {
            client.close();
            callback(result);
        });
    });
}

function deleteFLight(id,callback) {
    mongoClient.connect(url,function (error,client) {
        if(error)throw error;
        var database = client.db('myproject');
        var handler = database.collection('flight');
        handler.findOneAndDelete({flightId:id},function (error,result) {
            if(error)
                throw error;
            client.close();
            console.log("Deleted");
            console.log(result);
            callback();
        })
    })
}

module.exports = {

    GetDetails : GetDetails,
    GetDetailsById : GetDetailsUsingId,
    BookFlight : BookFlight,
    getAllFlights:getAllFlights,
    deleteFLight:deleteFLight,
    getAllFlightsDuplicate:getAllFlightsDuplicate
};