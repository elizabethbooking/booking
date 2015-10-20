var express = require('express')
, router = express.Router()
, jwt = require('jwt-simple')
, db = require('../../database/database')
,config = require('../../config/config.js')
, tokenSecret=config.tokensecret
,_  = require('underscore');




   
	     function ensureAuthenticated(req, res, next) {
				  try
					  {
						var decoded = jwt.decode(req.headers.token, tokenSecret);
						  req.user={};
						  req.user._id=decoded.username;
						  return next();
					  }
					  catch (e)
					  {
						   console.error(e);
						   res.status(401).json({error: "Server Error"});
					 }
					  
			}

  
     
          
		         router.get('/', function(req, res){
					  res.json({message:'Elizabeth Booking Booking Api'});
					});
        
        
		        router.post('/login',function(req, res){
		        	console.log(req.body);
		    	         db.getCredentials(req.body.username,req.body.password, function(err, user) {

						 if (err)  { console.log(user); res.send(401);  }
						 else {	var token = jwt.encode({username: user}, tokenSecret);
							     res.status(200).json({token : token  });	
							  }
						});

		          });



                router.post('/availability/:company_id', function(req, res){

					  var query = {'$or':[
					      {'$and': [
					        {'end.date': {'$gt': req.body.check_in}},
					        {'start.date': {'$lt': req.body.check_in}}]},
					      {'$and': [
					        {'start.date': {'$gte': req.body.check_in}},
					        {'start.date': {'$lte': req.body.check_out}}]}
					  ], 'company_id': req.params.company_id};
					  Model.reservation.find(query)
					    .select({'rooms': 1, '_id' : 0})
					    .exec(function(err, reservations){
					      if (err) res.send(err);
					      else {
					        var rooms = reservations.map(function(rez){return rez.rooms;});
					        query = {id: {$nin: _.flatten(rooms)}, 'company_id': req.params.company_id};
					        Model.inventory.find(query)
					          .exec(function(err, available){
					            if (err) res.send(err);
					            else{
					             res.json(available);
					            }
					          });
					      }
					    }
					  );
					});

                router.get('/logout', function(req, res){
				  req.logout();
				  res.redirect('/api');
				});



                router.get('/:model',  function(req, res){
					  var model_name = (req.params.model).toLowerCase();
					  var DataModel = Model[model_name] || null;
					  if (DataModel) {
					    DataModel.find({}, function(err, data){
					      res.json(data);
					    });
					  }
					  else res.end();
					});

			    router.get('/:model/:id', function(req, res){
					  var model_name = (req.params.model).toLowerCase();
					  var DataModel = Model[model_name] || null;
					  if (DataModel) {
					    DataModel.findOne({_id:req.params.id}, function(err, data){
					      res.json(data);
					    });
					  }
					  else res.end();
					});

				router.get('/:model/:id/:key/:value', function(req, res){
					  var model_name = (req.params.model).toLowerCase();
					  var DataModel = Model[model_name] || null;
					  if (DataModel) {
					    var query = new Object();
					    query[req.params.key] = req.params.value;
					    DataModel.find(query, function(err, data){
					      res.json(data);
					    });
					  }
					  else res.end();  
					});



				/***************  create reservation data ****************/
			      router.post('/reservation', function(req, res){
					  // console.log(req.body);
					    
					     var data={};
					     var customer={};
					       data.company_id=req.body.company_id;
					       data.guestinfo=req.body.guestinfo; 
					       data.price=req.body.roomSummary.tPrice;
					      //1. insert data in reservation collection

					      data.adults=req.body.guestSummary.adults;
					      data.childs=req.body.guestSummary.childs;
					      data.startdate=req.body.guestSummary.check_in;
					      data.enddate=req.body.guestSummary.check_out;

					     // console.log(data);
					           customer.company_id=req.body.company_id;
					          customer.guestinfo=req.body.guestinfo;
					      saveCustomer(customer,function(err,status){
					           if (err){
					            res.status(501).json({error: status});
					          }
					            else {
					                   data.customerid='100';  //to impliment later
					                  saveReservation(data,function(err,status){
					                 if (err){

					                  res.status(501).json({error: status});
					                }
					                  else {res.status(200).json({success: status});}
					             });
					            }
					       });      


					       
					    
					    //2.insert data in customer collections
					    //3. send mail to Admin
					      
					  });


					


					/**********************Database Functions **************************/


					 var saveReservation =  function (reservationData,callback){
					    
					     //what is id in reservation schema
					     //where is the credit card info saved 
					     //what is policy id 
					     //what is customer number also in reservation schema
					     var reservation = Model.reservation({
					            company_id:reservationData.company_id,
					            email:reservationData.guestinfo.email,
					            name :{first:reservationData.guestinfo.names.firstname,last:reservationData.guestinfo.names.lastname},
					            telephone:reservationData.guestinfo.phone,
					            status:'Credit Card Pending',
					            price:reservationData.price,
					            occupants:{adults:reservationData.adults,childs:reservationData.childs},
					            start:{date:reservationData.startdate},
					            end:{date:reservationData.enddate},
					            customer:reservationData.customerid,
					            date: new Date()


					      });
					     reservation.save(function(err,reservation){
					            if (err){callback(true,err);}
					            else {
					       //       console.log("return value ");
					        //      console.log(reservation);
					              callback(false,reservation._id);
					            }
					     });


					  };

					    var saveCustomer =  function (customerData,callback){

					        var customer =Model.customer({
					               id:"100",
					               company_id:customerData.company_id,
					              name :{first:customerData.guestinfo.names.firstname,last:customerData.guestinfo.names.lastname},
					              telephone:customerData.guestinfo.phone,
					              email:customerData.guestinfo.email,
					              address:{ 
					                        street : customerData.guestinfo.address,
					                        city   : customerData.guestinfo.city,
					                        postal_code : customerData.guestinfo.postcode,
					                        country  : customerData.guestinfo.country
					                }

					          });
					        customer.save(function(err,customer){
					            if (err){callback(true,err);}
					            else {
					              callback(false,customer._id);
					            }
					     });

					  };

					var sendMail =  function (callback){



					  };

 
module.exports = router