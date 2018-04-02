var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// Import libary

// Init variable
var app = express();
var port = process.env.port || 3000;
// Init variable

// Connect to db
// mongoose.Promise = require('bluebird');
var db;
db = mongoose.connect('mongodb://localhost/voting-dapp')
    .then(() =>  console.log('connection succesful to mongodb'))
    .catch((err) => console.error(err));

// Connect to db

// Utility package
// app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true } ));
app.use(bodyParser.json());
// Utility package

// Serve UI 
app.use(express.static(path.join(__dirname, 'dist')));
// Serve UI 


/* Routes */ 

// index page
app.get('/doto',function(req, res) {
  res.send('Doto plus');
});

/* login route */
/* var userModel = require('./models/User.model');
var userRouter = require('./routes/user.route')(userModel);
app.use('/api/login', userRouter); */
/* get image route */
/* var imageModel = require('./models/Image.model');
var imageRouter = require('./routes/image.route')(imageModel);
app.use('/api/image', imageRouter); */

/* Routes */ 


/* dev */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); 
  res.render('error');
});
// gulp dev
app.listen(port, function() {
    console.log('gulp is running on:' + port);
});

module.exports = app;