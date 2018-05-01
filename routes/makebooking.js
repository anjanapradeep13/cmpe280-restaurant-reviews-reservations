var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cmpe280";
var ObjectId = require('mongodb').ObjectID;

function newbooking(req, res) {

    var restid = req.session.restaurantid;
    var numtab = req.body.tables;
    var bookdate = req.body.bookdate;
    var userid = req.session.userid;
    console.log("tables: " + numtab);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cmpe280");
        dbo.collection("booking").insertOne({restid: restid,userid: userid, tables: numtab,bookdate: bookdate}, function(err, result) {
            if (err) throw err;
            else
            res.render('../views/successbooking.html');
            db.close();
        });
    });

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("cmpe280");
            dbo.collection("restaurant_details").find({_id :ObjectId(restid)}).toArray(function(err, result) {
                if (err) throw err;
                if(result){
                  console.log(result[0].Tables);
                  var temp=result[0].Tables-numtab;
                  MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("cmpe280");
                    var myquery = { _id :ObjectId(restid) };
                    var newvalues = { $set: {Tables:  temp} };
                    dbo.collection("restaurant_details").updateOne(myquery, newvalues, function(err, res) {
                      if (err) throw err;
                      console.log("1 document updated");

                      db.close();
                    });
                  });
                }

                db.close();
            });
        });
}//function

exports.newbooking = newbooking;
