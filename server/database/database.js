

var app, path, tinylr, _, session, crypto, mongoose,config ;

mongoose      = require('mongoose');
Model         = require('./schema.js');
_             = require('underscore');
path          = require('path');
tinylr        = require('tiny-lr');
crypto        = require('crypto');
config        =require('../config/config.js')

mongoose.connect(config.DatabaseUrl);
var Objectid=mongoose.Types.Objectid;




exports.getCredentials=function(username,pwd,fn){	
 

  Model.user.findOne({ 'username': username }, function(err, user){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {
    	console.log(user);
      return fn(null,user);
    }

  });

};

exports.pendingConfirmation=function(req,fn){

   Model.reservation.find({ 'status': "Credit Card Pending" }, function(err, doc ){
    if (err) { 
       
    	return fn(true,err);}
    else {

      return fn(false,doc);
    }

  });

};


exports.UpdateReservation=function(req,fn){
    var query = { _id: req.body._id };
   Model.reservation.update(query,{ $set: { 'status': "card confirmed" }}, function(err, reservations){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {

      return fn(false,reservations);
    }

  });

};

exports.UpdateToCheckin=function(req,fn){
    var query = { _id: req.body._id };
   Model.reservation.update(query,{ $set: { 'status': "Checked IN" }}, function(err, reservations){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {

      return fn(false,reservations);
    }

  });

};



exports.TodayCheckin=function(req,fn){
	var today= new Date();
	var yest=new Date(); 
	var tom=new Date(); 

	//console.log("today date " + today + " the day is "  + today.getDate());
	var yesterday = yest.setDate(today.getDate()-1)
	var tommorow = tom.setDate(today.getDate()+1)

//	console.log("yesterday " + yesterday);
//	console.log("tommorrow" + tommorow );
   // var query =  {'start.date':  dt};

   var query =  {'$and': [
	{'start.date': {'$gt': yesterday}},
	{'start.date': {'$lt': tommorow}},
    {'status': 'card confirmed'}
	]};

   Model.reservation.find(query, function(err, checkins){
    if (err) { 
 
    	return fn(true,err);}
    else {

      return fn(false,checkins);
    }

  });

};



exports.TodayCheckOut=function(req,fn){
  var today= new Date();
  var yest=new Date(); 
  var tom=new Date(); 

  //console.log("today date " + today + " the day is "  + today.getDate());
  var yesterday = yest.setDate(today.getDate()-1)
  var tommorow = tom.setDate(today.getDate()+1)

//  console.log("yesterday " + yesterday);
//  console.log("tommorrow" + tommorow );
   // var query =  {'start.date':  dt};

   var query =  {'$and': [
  {'end.date': {'$gt': yesterday}},
  {'end.date': {'$lt': tommorow}},
  {'status': 'Checked IN'}
  ]};

   Model.reservation.find(query, function(err, checkins){
    if (err) { 
 
      return fn(true,err);}
    else {

      return fn(false,checkins);
    }

  });

}