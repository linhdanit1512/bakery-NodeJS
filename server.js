'use strict'
require('dotenv').config();
var express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    path = require('path'),
    app = express(),
    server = require('http').createServer(app),
    port = process.env.SERVER_PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(session({secret: process.env.PRIVATE_KEY, resave: true, saveUninitialized: true, cookie: {maxAge : 1000*60*300}}));
app.use(cookieParser(process.env.PRIVATE_KEY));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', [	path.join(__dirname + '/views')]);

var userRoute = require('./routes/user-route');
var cakeRoute = require('./routes/cake-route');
var ingredientRoute = require('./routes/ingredient-route');
var manageRoute = require('./routes/management-route');
var manageCakeRoute = require('./routes/manage-cake');
var manageIngreRoute = require('./routes/manage-ingredient');
var manageUserRoute = require('./routes/manage-user');

app.use('/', userRoute);
app.use('/manage', manageRoute);
app.use('/manage/cake', manageCakeRoute);
app.use('/manage/ingredient', manageIngreRoute);
app.use('/manage/user', manageUserRoute);
app.use('/cake', cakeRoute);
app.use('/ingredient', ingredientRoute);

server.listen(port, function() {
	console.log(`Waiting statement at port ${port}...`);
});