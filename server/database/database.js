

var app, path, tinylr, _, session, crypto, mongoose,config ;

mongoose      = require('mongoose');
Model         = require('./schema.js');
_             = require('underscore');
path          = require('path');
tinylr        = require('tiny-lr');
crypto        = require('crypto');
config        =require('../config/config.js')
mail=require('../email/mail.js');



mongoose.connect(config.DatabaseUrl);
var Objectid=mongoose.Types.Objectid;




exports.getCredentials=function(username,pwd,fn){	
 

  Model.user.findOne({ 'username': username }, function(err, user){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {
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
exports.editReservation=function(req,fn){
   var query = { _id: req.body._id };
   delete req.body["_id"];
   Model.reservation.update(query,{ $set: req.body }, function(err, reservations){
    if (err) { 
        console.log(err);
      return fn(true,err);}
    else {
      return fn(false,reservations);
    }

  });
};

exports.UpdateReservation=function(req,fn){
  console.log( req.body);
    var query = { _id: req.body._id };
   Model.reservation.update(query,{ $set: { 'status': "card confirmed" }}, function(err, reservations){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {
               var user={};
                           user.email=req.body.email;
                           user.reservationid=req.body._id
                           user.name=req.body.name;
                           
                          
            mail.sendWelcomeMail(user); 
            
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

exports.UpdateToCheckout=function(req,fn){
    var query = { _id: req.body._id };
   Model.reservation.update(query,{ $set: { 'status': "Checked OUT" }}, function(err, reservations){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {

      return fn(false,reservations);
    }

  });

};






exports.GuestCheckedin=function(req,fn){
    
   Model.reservation.find({ 'status': "Checked IN" }, function(err, doc ){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {

      return fn(false,doc);
    }

  });

};

exports.Updaterooms=function(req,fn){

	                var inventory =Model.inventory({
					 		id:req.body.id,
					 		company_id:req.body.company_id,
					 		type:req.body.type,
					 		title:req.body.title,
					 		description:req.body.description,
					 		category:req.body.category,
					 		images:req.body.image.data,
					 		status:req.body.status,
					 		lastupdate:new Date(),
					 		base_price:req.body.base_price
                           });
    
                      inventory.save(function(err,inv){
					 		if (err){console.log(err);fn(true,err);}
					 		else {
					 	
					 			fn(false,inv);
					 		}
					 	});

      
  

};

exports.CreateUser=function(req,fn){
      if (typeof req.body.image==='undefined'){
               req.body.image={};
                req.body.image.data="";
      };
  

	var user = Model.user({
           company_id:req.body.company_id,
           username:req.body.username,
           password:req.body.password,
           name:{
           	    first:req.body.firstname,
                last:req.body.lastname
           },
           image:req.body.image.data,
           email:req.body.email,
           role:req.body.role.name,
           status:"Active",
           datecreated:new Date()

	});

	                user.save(function(err,usr){
					 		if (err){
					 			console.log(err);
					 			fn(true,err);}
					 		else {
					 	
					 			fn(false,usr);
					 		}
					 	});


};

exports.Getrooms=function(req,fn){
    
  Model.inventory.find({ 'company_id': req.params.company_id }, function(err, rooms){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {
      return fn(null,rooms);
    }

  });
  

};


exports.Getusers=function(req,fn){
    
  Model.user.find({ 'company_id': req.params.company_id }, function(err, users){
    if (err) { 
        console.log(err);
    	return fn(true,err);}
    else {
      return fn(null,users);
    }

  });
  

};

exports.Getuser=function(req,fn){
     
  Model.user.findOne({ 'username': req.params.username }, function(err, users){
    if (err) { 
        console.log(err);
      return fn(true,err);}
    else {
      return fn(null,users);
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