const express = require('express'),
    authenticated = require('../util/authenticate').authenticated,
    deauthenticated = require('../util/authenticate').deauthenticated;
var ingreRouter = express.Router();

module.exports = exports = ingreRouter;