

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

   Model.reservation.find({ 'status': "Credit Card Pending" }, function(err, reservations){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {

      return fn(false,reservations);
    }

  });

};