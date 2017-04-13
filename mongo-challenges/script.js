// JavaScript File
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = "mongodb://" + process.env.IP + "/test";
var fs = require("fs");

MongoClient.connect(url, function (err, db) {
   if (err) {
       console.log('Unable to connect to the mongoDB server. Error:', err);
   } else {
       //manage the DB in here.
       console.log('Connection established test');
       db.dropDatabase(); //dump old database
       var Students = db.collection("Students"); //create table
       Students.insert([{"name":"Elias"}]); //input data to table
       
       var StudentsCursor = Students.find(); //search for data in table
       var studentsResult = 'The students of this cohort include:\n'; //string to write into the file
       StudentsCursor.each(function(err,doc) {
           if(err) console.log(err);
           else {
               if(doc) {
                   console.log(doc.name);
                   studentsResult += doc.name + "\n";
               }
               else {
                console.log( studentsResult );
               }
           }
       });
       db.close();
   }
});