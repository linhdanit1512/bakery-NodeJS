const express = require('express'),
    authenticated = require('../util/authenticate').authenticated,
    deauthenticated = require('../util/authenticate').deauthenticated;
var userRouter = express.Router();

userRouter.get('/', deauthenticated, function (req, res) {
    var category = ["Bánh ngọt", "Bánh mặn", "Bánh kem", "Bánh quy"];
    res.render('u/home.ejs', { 'req': req, 'res': res, category : category });
});

userRouter.get('/login', deauthenticated, function(req, res){
    res.render('u/login.ejs', { 'req': req, 'res': res, 'alertmessage' : req.flash('alertmessage') });
});

userRouter.get('/logout', authenticated, (req, res) => {
    res.redirect('/login');
});

userRouter.get('/profile', authenticated, function(req, res){
    res.render('u/home.ejs', { 'req': req, 'res': res, 'alertmessage' : req.flash('alertmessage') });
});

userRouter.get('/sell', deauthenticated, function(req, res){
    res.render('u/sell.ejs', { 'req': req, 'res': res, 'alertmessage' : req.flash('alertmessage') });
});

userRouter.get('/invoice', authenticated, function(req, res){
    res.render('u/invoice.ejs', { 'req': req, 'res': res, 'alertmessage' : req.flash('alertmessage') });
});

userRouter.get('/invoice/:id', authenticated, function(req, res){
    let id= req.params.id;
    res.render('u/invoice.ejs', { 'req': req, 'res': res, 'alertmessage' : req.flash('alertmessage') });
});

userRouter.get('/cake', deauthenticated, function(req, res){
    res.render('u/cake.ejs', { 'req': req, 'res': res });
});

userRouter.get('/cake/:slug', deauthenticated, function(req, res){
    var slug = req.params.slug;
    res.render('u/cake-detail.ejs', { 'req': req, 'res': res, 'alertmessage' : req.flash('alertmessage') });
});

module.exports = exports = userRouter;