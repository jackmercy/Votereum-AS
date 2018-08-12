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
import {GeneralConfig} from "./config/general.config";


/* Import libary */

/* Init variable */
global.app = express();
var port = process.env.port || 5000;
/* Init variable */

/* MongoDb */
var db;
db = mongoose.connect(GeneralConfig.MONGODB_CONNECTION_STRING, { useNewUrlParser: true } )
    .then(() =>  console.log('connection succesful to mongodb'))
    .catch((err) => console.error(err));
/* MongoDb */

app.set('jwtSecret', GeneralConfig.SECRET); // secret variable

// =======================
// configuration =========
// =======================

// app.use(logger('dev'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true } ));
app.use(bodyParser.json());
app.use(compress());


/* Serve UI ---------------------*/
app.use(express.static(path.join(appRoot.path, 'dist')));
/* Serve UI ---------------------*/

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

/* Routes ---------------------- */
app.use('/api', router);
/* Routes ---------------------- */

/* Url Rewriting ----------------*/
app.get('*', function(req, res, next) {
    res.sendFile(path.join(appRoot.path, '../dist/index.html'));
});
/* Url Rewriting ----------------*/


// error handler ==================
/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// error handler ==================



// ================================
// Start the server ===============
// ================================
app.listen(port, function() {
    console.log('server is running on:' + port);
});

export default app;
