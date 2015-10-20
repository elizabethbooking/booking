var express = require('express')
, router = express.Router()
, jwt = require('jwt-simple')
, DatabaseConn = require('../../database/database')
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
						   res.json(401,{error: "Server Error"});
					 }
					  
			}

  
    

       router.get('/test', function(req, res){
          res.json({"token" : "helooooo" });	
      }); 

     router.get('/', function(req, res){
         res.redirect('/admin.html');
      });     
      



module.exports = router