var express = require('express')
, router = express.Router()
, jwt = require('jwt-simple')
, db = require('../../database/database')
,config = require('../../config/config.js')
, tokenSecret=config.tokensecret;

	     


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
						 //  res.json(401,{error: "Server Error"});
						   res.status(401).json({error: "Authentication Required"});
					 }
					  
			}

  
      router.post('/Confirmreservation', function(req, res){
          db.UpdateReservation(req,function(status,resp){
              if(status){
                   res.status(500).json({"Error": resp})
              }else{
              	res.status(200).json({"sucess": "ok"})
              }

          });
      	
      });


		      router.post('/confirmCheckout', function(req, res){
		          db.UpdateToCheckout(req,function(status,resp){
		              if(status){
		                   res.status(500).json({"Error": resp})
		              }else{
		              	res.status(200).json({"sucess": "ok"})
		              }

		          });
		      	
		      });

		    router.post('/Confirmcheckin', function(req, res){
		          db.UpdateToCheckin(req,function(status,resp){
		              if(status){
		                   res.status(500).json({"Error": resp})
		              }else{
		              	res.status(200).json({"sucess": "ok"})
		              }

		          });
		      	
		      });

		    router.post('/room', function(req, res){
		          db.Updaterooms(req,function(status,resp){
		              if(status){
		                   res.status(500).json({"Error": resp})
		              }else{
		              	res.status(200).json({"status": "success"})
		              }

		          });
		      	
		      });


                
           router.get('/rooms/:company_id', function(req, res){
	          db.Getrooms(req,function(status,rooms){
	                     if(status){res.status(404).json({error: "Server Error"});}
	                     else {res.status(200).json({result: rooms})}	

	          	});
	         });  

	       router.get('/PendingReservations', function(req, res){
	          db.pendingConfirmation(req,function(status,reservations){
	                     if(status){res.status(404).json({error: "Server Error"});}
	                     else {res.status(200).json({result: reservations})}	

	          	});
	      });     
      
		   router.get('/', function(req, res){
		         res.redirect('/admin.html');
		      }); 

		   router.get('/todayCheckins', function(req, res){
		           db.TodayCheckin(req,function(status,checkins){
		                     if(status){res.status(404).json({error: "Server Error"});}
		                     else {res.status(200).json({result: checkins})}	

		          	});
		      }); 


		   router.get('/todayCheckOuts', function(req, res){
		           db.TodayCheckOut(req,function(status,checkouts){
		                     if(status){res.status(404).json({error: "Server Error"});}
		                     else {res.status(200).json({result: checkouts})}	

		          	});
		      }); 

          
		   router.get('/GuestCheckedin', function(req, res){
		           db.GuestCheckedin(req,function(status,guests){
		                     if(status){res.status(404).json({error: "Server Error"});}
		                     else {res.status(200).json({result: guests})}	

		          	});
		      });
		   


module.exports = router