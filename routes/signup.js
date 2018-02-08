
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cmpe280";

/*
router.post('/', function(req, res, next) {

    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("cmpe280");
        var myobj = { email: email, password: password , firstname: firstname, lastname:lastname};
        dbo.collection("users").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 user created");
            db.close();
        });

    });
});

module.exports = router;*/



function register(req,res){
  var email = req.body.email;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("cmpe280");
      var myobj = { email: email, password: password , firstname: firstname, lastname:lastname};
      dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 user created");
          db.close();
      });
res.render('index', { status: 'Signup successful' });
  });

}//function
exports.signup=register;
