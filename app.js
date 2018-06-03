var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./passport')
require('dotenv').config()

let port = process.env.PORT
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var unitsRouter = require('./routes/units');
var ticketRouter = require('./routes/tickets');
var authRouter = require('./routes/auth');


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( passport.initialize() )

app.use('/', indexRouter);
app.use(authRouter);
app.use(usersRouter); 
app.use(unitsRouter);
app.use(ticketRouter);


app.listen(port, () => {
    console.log('app running on server');
 })

 module.exports = app;
