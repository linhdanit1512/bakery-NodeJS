const express = require('express'),
    authenticated = require('../util/authenticate').authenticated,
    deauthenticated = require('../util/authenticate').deauthenticated;
var cakeRouter = express.Router();

cakeRouter.get('/', deauthenticated, function(req, res){
    res.render('u/cake.ejs', { 'req': req, 'res': res });
});

cakeRouter.get('/:slug', deauthenticated, function(req, res){
    var slug = req.params.slug;
    res.render('u/cake-detail.ejs', { 'req': req, 'res': res, 'alertmessage' : req.flash('alertmessage') });
});

module.exports = exports = cakeRouter;