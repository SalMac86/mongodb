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
       Students.insert([{"name":"Salvatore", "hobbies":["snowboarding", "reading", "hot-tubbing"]}]); //input data to table
       Students.insert([{"name":"Vincent", "hobbies":["surfing", "backpacking", "fishing"]}]);
       Students.insert([{"name":"Jenny", "hobbies":["baking", "swimming", "hiking"]}]);
       Students.insert([{"name":"Davis", "hobbies":["hiking", "photography", "cooking"]}]);
       Students.insert([{"name":"Hiram", "hobbies":["eating", "hiking", "sleeping"]}]);
       Students.insert([{"name":"Daniel", "hobbies":["surfing", "math", "scrabble"]}]);
       Students.insert([{"name":"Gerardo", "hobbies":["coding", "programming", "web development"]}]);
       Students.insert([{"name":"Trina", "hobbies":["yoga", "rock climbing", "tetris"]}]);
       var StudentsCursor = Students.find(); //search for data in table
       var studentsResult = 'The students of this cohort include:\n'; //string to write into the file
       StudentsCursor.each(function(err,doc) {
           if(err) console.log(err);
           else {
               if(doc) {
                   console.log(doc.name);
                   studentsResult += doc.name + "\n\t" + 
                   "Hobby1: " + doc.hobbies[0] + "\n\t" + 
                   "Hobby2: " + doc.hobbies[1] + "\n\t" + 
                   "Hobby3: " + doc.hobbies[2] + "\n";
               }
               else {
                console.log( studentsResult );
               }
           }
       });
       var GroupsCursor = Students.aggregate([{$unwind:"$hobbies"},{$group:{"_id":"$hobbies", "students":{"$addToSet":"$name"}, "count":{$sum:1}}},{$match:{"count":{$gt:1}}}]);
       var groupsResult = 'Students who share a hobby of '; //string to write into the file - +hobby+' include:\n';
       GroupsCursor.each(function(err,doc) {
           if(err) console.log(err);
           else {
               if(doc) {
                   console.log(groupsResult+doc._id+' include:');
                   for(var i = 0;i < doc.count;i++){
                    console.log('\t'+doc.students[i]);
                   }
               }
               else {
                console.log( 'end of Cursor' );
               }
           }
       });
       db.close();
   }
});