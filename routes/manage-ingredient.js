const express = require('express'),
    admin_authenticated = require('../util/authenticate').admin_authenticated,
    admin_deauthenticated = require('../util/authenticate').admin_deauthenticated;
var manageIngredientRouter = express.Router();

manageIngredientRouter.get('/', admin_authenticated, function (req, res) {
    res.render('admin/list/ingredient-list.ejs', { 'req': req, 'res': res });
});

manageIngredientRouter.get('/add', admin_authenticated, function (req, res) {
    res.render('admin/add/ingredient.ejs', { 'req': req, 'res': res });
});

manageIngredientRouter.get('/:id', admin_authenticated, function (req, res) {
    var  id = req.params.id;
    res.render('admin/add/ingredient.ejs', { 'req': req, 'res': res });
});

manageIngredientRouter.delete('/:del', admin_authenticated, function (req, res) {
    var  id = req.params.del;
    res.render('admin/add/ingredient.ejs', { 'req': req, 'res': res });
});

module.exports = manageIngredientRouter;