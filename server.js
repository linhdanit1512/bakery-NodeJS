'use strict'
require('dotenv').config();
var express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    path = require('path'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ secret: process.env.PRIVATE_KEY, resave: true, saveUninitialized: true, cookie: { maxAge: 1000 * 60 * 300 } }));
app.use(cookieParser(process.env.PRIVATE_KEY));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname + '/views')]);

var userRoute = require('./routes/user-route');
var adminRoute = require('./routes/admin-route');

app.use('/', userRoute);
app.use('/' + process.env.ADMIN_URL, adminRoute);

server.listen(port, function () {
    console.log(`Waiting statement at port ${port}...`);
    console.log(process.env);
});