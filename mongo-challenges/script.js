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
       Students.insert([{"name":"Salvatore", "Hobby1": "snowboarding", "Hobby2": "reading", "Hobby3": "hot-tubbing"}]); //input data to table
       Students.insert([{"name":"Vincent", "Hobby1": "surfing", "Hobby2": "backpacking", "Hobby3": "fishing"}]);
       Students.insert([{"name":"Jenny", "Hobby1": "baking", "Hobby2": "swimming", "Hobby3": "hiking"}]);
       Students.insert([{"name":"Davis", "Hobby1": "hiking", "Hobby2": "photography", "Hobby3": "cooking"}]);
       Students.insert([{"name":"Hiram", "Hobby1": "eating", "Hobby2": "hiking", "Hobby3": "sleeping"}]);
       Students.insert([{"name":"Daniel", "Hobby1": "surfing", "Hobby2": "math", "Hobby3": "scrabble"}]);
       Students.insert([{"name":"Gerardo", "Hobby1": "coding", "Hobby2": "programming", "Hobby3": "web development"}]);
       var StudentsCursor = Students.find(); //search for data in table
       var studentsResult = 'The students of this cohort include:\n'; //string to write into the file
       StudentsCursor.each(function(err,doc) {
           if(err) console.log(err);
           else {
               if(doc) {
                   console.log(doc.name);
                   studentsResult += doc.name + "\n\t" + 
                   "Hobby1: " + doc.Hobby1 + "\n\t" + 
                   "Hobby2: " + doc.Hobby2 + "\n\t" + 
                   "Hobby3: " + doc.Hobby3 + "\n";
               }
               else {
                console.log( studentsResult );
               }
           }
       });
       db.close();
   }
});