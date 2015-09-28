var app, path, express, tinylr, bodyParser,
    _, session, crypto, cookieParser,
    passport, mongoose, LocalStrategy;

_             = require('underscore');
path          = require('path');
tinylr        = require('tiny-lr');
express       = require('express');
session       = require('express-session');
crypto        = require('crypto');
bodyParser    = require('body-parser');
cookieParser  = require('cookie-parser');
mongoose      = require('mongoose');
passport      = require('passport');
LocalStrategy = require('passport-local').Strategy;
Model         = require('./app/db/schema.js');
app           = express();

mongoose.connect('mongodb://127.0.0.1/booking');
var Objectid=mongoose.Types.Objectid;

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('keyboard cat'));
app.use(session({secret:'keyboard cat', resave:false, saveUninitialized:true, cookie: {httpOnly: true, maxAge: 2419200000}})); // CHANGE THIS SECRET!
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username, password, done){


  Model.user.findOne({username:username}, function(err, obj){
    var user, shasum;
    if (err) { return done(err); }
    else {

      user = obj.toObject();
      shasum = crypto.createHash('sha1');
      shasum.update(password, 'utf8');
    }
    /*   un-comment this later ..
    if (!user) {
      return done(null, false, {message: 'Incorrect email.'});
    }
    if (shasum.digest('hex') !== user.password) {
      return done(null, false, {message: 'Incorrect password.'});
    }*/

    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  Model.user.findById(id, function(err, user){
    done(err, user);
  });
});

/**********************************************************************************/
app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/public/admin.html');
});

app.get('/api/', function(req, res){
  res.json({message:'Elizabeth Booking Booking Api'});
});

app.post('/api/login', passport.authenticate('local'), function(req, res){
  Model.user.findById(req.session.passport.user, function(err, user){
    if (err) res.send(err);
    else res.json(user);
  });
});

/**
 * Find available inventory, based on a date range
 */
app.post('/api/availability/:company_id', function(req, res){

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

app.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/api');
});

app.get('/api/:model', isAuthenticated, function(req, res){
  var model_name = (req.params.model).toLowerCase();
  var DataModel = Model[model_name] || null;
  if (DataModel) {
    DataModel.find({}, function(err, data){
      res.json(data);
    });
  }
  else res.end();
});

app.get('/api/:model/:id', function(req, res){
  var model_name = (req.params.model).toLowerCase();
  var DataModel = Model[model_name] || null;
  if (DataModel) {
    DataModel.findOne({_id:req.params.id}, function(err, data){
      res.json(data);
    });
  }
  else res.end();
});

app.get('/api/:model/:id/:key/:value', function(req, res){
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
  app.post('/api/reservation', function(req, res){
   console.log(req.body);
    
     var data={};
       data.company_id=req.body.company_id;
       data.guestinfo=req.body.guestinfo; 
       data.price=req.body.roomSummary.tprice;
      //1. insert data in reservation collection

      data.adults=req.body.guestSummary.adults;
      data.childs=req.body.guestSummary.childs;
      data.startdate=req.body.guestSummary.check_in;
      data.enddate=req.body.guestSummary.check_out;

     // console.log(data);
       saveReservation(data,function(err,status){
           if (err){
            console.log(status);
            res.status(501).json({error: status});
          }
            else {res.status(200).json({success: status});}
       });
    
    //2.insert data in customer collections
    //3. send mail to Admin
      
  });


/**********************************************************************************/
function isAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/api');
}

app.listen(3000, function(){
  console.log('Express app started on port 3000');
});


/**********************Database Functions **************************/


 var saveReservation =  function (reservationData,callback){
     console.log(reservationData);

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
            date: new Date()


      });
     reservation.save(function(err,reservation){
            if (err){callback(true,err);}
            else {
              console.log("return value ");
              console.log(reservation);
              callback(false,reservation._id);
            }
     });


  };

var saveCustomer =  function (customerData,callback){



  };

var sendMail =  function (callback){



  };

