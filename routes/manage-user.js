const express = require('express'),
    admin_authenticated = require('../util/authenticate').admin_authenticated,
    admin_deauthenticated = require('../util/authenticate').admin_deauthenticated;;
var manageUserRouter = express.Router();

manageUserRouter.get('/', admin_authenticated, function (req, res) {
    res.render('admin/list/user-list.ejs', { 'req': req, 'res': res });
});

manageUserRouter.get('/add', admin_authenticated, function (req, res) {
    res.render('admin/add/user.ejs', { 'req': req, 'res': res });
});

manageUserRouter.get('/:id', admin_authenticated, function (req, res) {
    var  id = req.params.id;
    res.render('admin/add/user.ejs', { 'req': req, 'res': res });
});

manageUserRouter.delete('/:del', admin_authenticated, function (req, res) {
    var  id = req.params.del;
    res.render('admin/add/user.ejs', { 'req': req, 'res': res });
});

manageUserRouter.put('/:blockid/:status', admin_authenticated, function (req, res) {
    var  id = req.params.blockid;
    var  status = req.params.status;
    res.render('admin/add/user.ejs', { 'req': req, 'res': res });
});

module.exports = manageUserRouter;