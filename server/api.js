const authenticate = require('./middleware/authenticate.js');
const authenticatePasswordResetToken = require('./middleware/authenticatePasswordResetToken.js');
const authenticateSignin = require('./middleware/authenticateSignin.js');
const requestLogger = require('./middleware/requestLogger.js');
const user = require('./controllers/user.js');
const express = require('express');
const api = express.Router();

const onPlaceholder = (request, response) => response.status(500).json({ message: 'Under Construction' })

api.route('/register').post(user.onRegisterNewUser);
api.route('/users').post(user.onRegisterNewUser);
api.route('/signin').post(authenticateSignin, user.onSignin);
api.route('/signout').post(onPlaceholder);
api.route('/forgot').post(user.onForgotPassword);
api.route('/reset').post(user.onResetPassword);

api.route('/users').get(user.onGetUsers);
api.route('/test').get(requestLogger, authenticate, (request, response) => { 
    response.json({ message: 'authenticated' });})
module.exports = api;