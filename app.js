var express=require('express'),
     app=express();

var bodyParser = require('body-parser');
var serveStatic = require('serve-static');


app.use(serveStatic(__dirname + '/client/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));


var router = require('./server/router')(app);

  app.listen(process.env.PORT || 3000);
  console.log('Elizabeth Booking  Api Started on Port 3000');


module.exports = app;





