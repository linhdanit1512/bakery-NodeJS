const express = require('express'),
    admin_authenticated = require('../util/authenticate').admin_authenticated,
    admin_deauthenticated = require('../util/authenticate').admin_deauthenticated;
var manageCakeRouter = express.Router();

/**----------------  GENERAL  -------------------------------------- */


manageCakeRouter.get('/', admin_authenticated, function (req, res) {
    res.render('admin/list/cake-list.ejs', { 'req': req, 'res': res });
});

manageCakeRouter.get('/add', admin_authenticated, function (req, res) {
    res.render('admin/add/cake.ejs', { 'req': req, 'res': res });
});

manageCakeRouter.get('/:slug', admin_authenticated, function (req, res) {
    var  id = req.params.slug;
    res.render('admin/add/cake.ejs', { 'req': req, 'res': res });
});
manageCakeRouter.delete('/:del', admin_authenticated, function (req, res) {
    var  id = req.params.del;
    res.render('admin/add/cake.ejs', { 'req': req, 'res': res });
});


module.exports = exports = manageCakeRouter;