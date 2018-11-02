import express    from 'express';
import path       from 'path';
import bodyParser from 'body-parser';
import mongoose   from 'mongoose';
import compress   from 'compression';
import appRoot    from 'app-root-path';
import Web3       from 'web3';
// import favicon from 'serve-favicon';
import morgan     from 'morgan';
// import logger  from 'logger';
import router     from './routes/index.route';
import { GeneralConfig } from "./config/general.config";
import { retry }         from 'rxjs/operators';
/* Utilities */
import * as UtilityFunction from './utility/utilities.func';
/* Utilities */
/* SSL */
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./ssl/server.key', 'utf8');
var certificate = fs.readFileSync('./ssl/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
/* SSL */

/* Import libary */

/* Init variable */
global.app = express();

var port = process.env.port || 5000;
var sPort = 5443;
/* Init variable */

/* MongoDb */
var db;
db = mongoose.connect(GeneralConfig.MONGODB_CONNECTION_STRING, { 
    useNewUrlParser: true,
    useCreateIndex: true 
}).then(() =>  console.log('[x] MongoDB: Connected'))
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
var httpServer = http.createServer(app, function(req, res) {
    console.log(`this is req url ${req.headers['host']} ${req.url}`);
    res.writeHead(307, { "Location": "https://" + req.headers['host'] + req.url }); 
    res.end();
});

//Testnet
global.web3 = new Web3('http://localhost:8545');
if (web3) {
    //console.log(global.ballotContract.option);
    console.log('[x] Web3: Connected');
}
else {
    console.log('error on connecting to Web3');
}

var httpsServer = https.createServer(credentials, app);
httpServer.listen(port, function() {
    console.log('server is running on:' + port);
});
httpsServer.listen(5443, function() {
    console.log('server is running on:' + sPort);
});

export default app; 
