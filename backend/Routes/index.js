const express =  require('express');
const user = require('./user');
const account = require('./account');
const Router = express.Router();

Router.use('/user',user);
Router.use('/account',account);

module.exports = Router;