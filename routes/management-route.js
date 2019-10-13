const express = require('express'),
    admin_authenticated = require('../util/authenticate').admin_authenticated,
    admin_deauthenticated = require('../util/authenticate').admin_deauthenticated,
    formidable = require('formidable'),
    imageUtil = require('../util/image'),
    randomstring = require("randomstring");
var manageRouter = express.Router();

module.exports = exports = manageRouter;