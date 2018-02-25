'use strict';
/* Middleware Intialization - START */
var   express       = require('express'); 
var   app           = express();
var   MongoClient   = require('mongodb').MongoClient;
var   http          = require('http');
var   https 		= require('https');
var   fs 			= require('fs');
var   session       = require('express-session');
var   cookieParser  = require('cookie-parser');
var   serv          = http.createServer(app);
const mongoose 	    = require('mongoose');
var   bodyParser    = require('body-parser');
const MongoStore    = require('connect-mongo')(session);
/* Middleware Intialization - END */

/* Define express routes - START */
var bounty      = require('./bounty/bounty_router');
/* Define express routes - END */

/* Configuration - START */
var config = require('./configuration/config')
/* Configuration - END */

/* Define SESSION - START */
var sessionMiddleware = session({name : config.name,        
                				secret		 	  : config.secret,
								proxy 			  : config.proxy,
								resave 			  : config.resave,
								saveUninitialized : config.saveUni,
								cookie			  : config.cookie,
				 				rolling 		  : true,
store: new MongoStore({ url: 'mongodb://localhost/prybox' , mongooseConnection: mongoose.connection }) });
app.use(sessionMiddleware);
/* Define SESSION - END */

/* Use Express routes - START */
app.use('/',bounty);
/* Use Express routes - END */

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser('keyboard'));

/* EJS - START */
app.set('views','./views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
/* EJS - END */

/* Mongo connect - START */
mongoose.connect('mongodb://localhost/prybox', function(err){
	if(err)
	{
		console.log(err);
	} 
	else
	{
		console.log('Connected to mongodb!');
	}
});

/* Mongo connect - END */

serv.listen(4000, function() {
	console.log('Server running at http://192.168.43.120:4000');
});