import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import compress from 'compression';
import appRoot from 'app-root-path';
// import favicon from 'serve-favicon';
import morgan from 'morgan';
import Web3 from 'web3';
// import logger from 'logger';
import router from './routes/index.route';

import votingJson from './Voting';

/* Import libary */

/* Init variable */
var app = express();
var port = process.env.port || 5000;
/* Init variable */

/* MongoDb */
var db;
db = mongoose.connect('mongodb://localhost/ether-vote-as')
    .then(() =>  console.log('connection succesful to mongodb'))
    .catch((err) => console.error(err));
/* MongoDb */

/* Utility package */
// app.use(logger('dev'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true } ));
app.use(bodyParser.json());
app.use(compress());
/* Utility package */

/* Serve UI */
app.use(express.static(path.join(appRoot.path, 'dist')));
/* Serve UI */
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
/* Routes */
app.use('/api', router);
/* Routes */

/* Url Rewriting */
app.get('*', function(req, res, next) {
    res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});
/* Url Rewriting */


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
// start server on port
app.listen(port, function() {
    console.log('server is running on:' + port);
});


//Connecting to blockchain

var abiDefinition;
var votingContract;

abiDefinition = votingJson.abi;

//Testnet
global.web3 = new Web3('http://localhost:8545');
global.votingContract = new web3.eth.Contract(abiDefinition,'0xbdca24b079e714146fe40764c2d9b9f7995afc2a');



//Ganache
/*global.web3 = new Web3('http://localhost:9545');
global.votingContract = new web3.eth.Contract(abiDefinition,'0x345ca3e014aaf5dca488057592ee47305d9b3e10');*/


if (web3) {
    console.log('successfully connected to blockchain');
}
else {
    console.log('error on connecting blockchain');
}


export default app;
