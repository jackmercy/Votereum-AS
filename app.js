import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import compress from 'compression';
import appRoot from 'app-root-path';
// import favicon from 'serve-favicon';
import morgan from 'morgan';
// import logger from 'logger';
import router from './routes/index.route';
import Web3 from 'web3';
import votingJson from './Voting';
/* Import libary */

/* Init variable */
var app = express();
var port = process.env.port || 5000;
/* Init variable */

/* MongoDb */
var db;
db = mongoose.connect('mongodb://localhost/voting-dapp')
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
// gulp dev
app.listen(port, function() {
    console.log('server is running on:' + port);
});


//Connecting to blockchain
var abiDefinition;
var VotingContract;
global.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

abiDefinition = votingJson.abi;
VotingContract = global.web3.eth.contract(abiDefinition);

global.contractInstance = VotingContract.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10');
if (contractInstance) {
    console.log('successfully connected to blockchain');
}
else {
    console.log('error on connecting blockchain');
}

export default app;
