const express = require('express'),
    admin_authenticated = require('../util/authenticate').admin_authenticated,
    admin_deauthenticated = require('../util/authenticate').admin_deauthenticated;;
var manageRouter = express.Router();

/**----------------  GENERAL  -------------------------------------- */

manageRouter.get('/login', admin_deauthenticated, function(req, res){
    res.render('admin/login.ejs', { 'req': req, 'res': res, 'alertmessage' : req.flash('alertmessage') });
});

manageRouter.get('/logout', admin_authenticated, (req, res) => {
    res.redirect('admin/login');
});

manageRouter.get('/', admin_authenticated, function (req, res) {
    res.render('admin/dashboard.ejs', { 'req': req, 'res': res });
});

manageRouter.get('/setting', admin_authenticated, function (req, res) {
    res.render('admin/setting.ejs', { 'req': req, 'res': res });
});

module.exports = exports = manageRouter;