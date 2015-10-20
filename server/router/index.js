module.exports = function (app) {

	  app.use('/admin', require('./routes/admin'));
      app.use('/api', require('./routes/client'));

};