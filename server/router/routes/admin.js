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

  
    

       router.get('/test', function(req, res){
          res.json({"token" : "helooooo" });	
      }); 

     router.get('/', function(req, res){
         res.redirect('/admin.html');
      }); 

       router.get('/PendingReservations', function(req, res){
          db.pendingConfirmation(req,function(status,reservations){
                     if(status){res.status(404).json({error: "Server Error"});}
                     else {res.status(200).json({result: reservations})}	

          	});
      });     
      



module.exports = router