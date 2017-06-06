const authenticate = require('./middleware/authenticate.js');
const authenticatePasswordResetToken = require('./middleware/authenticatePasswordResetToken.js');
const authenticateSignin = require('./middleware/authenticateSignin.js');
const requestLogger = require('./middleware/requestLogger.js');
const user = require('./controllers/user.js');
const collaboration = require('./controllers/collaboration.js');
const express = require('express');
const api = express.Router();

const onPlaceholder = (request, response) => response.status(500).json({ message: 'Under Construction' })
const fakeAuthenticate = (request, response, next) => {
    request.userId = 'fake';
    next();
}

api.route('/register').post(user.onRegisterNewUser);
api.route('/users').post(user.onRegisterNewUser);
api.route('/signin').post(authenticateSignin, user.onSignin);
api.route('/signout').post(onPlaceholder);
api.route('/forgot').post(user.onForgotPassword);
api.route('/reset').post(authenticatePasswordResetToken, user.onResetPassword);

api.route('/start').post(authenticate, collaboration.onStartCollaboration);
api.route('/join').post(authenticate, collaboration.onJoinCollaboration);
api.route('/questionnaires').post(authenticate, collaboration.onSubmitQuestionnaire);
api.route('/questionnaires').get(authenticate, onPlaceholder);

api.route('/collaborations').get(collaboration.onGetCollaborations);
api.route('/users').get(user.onGetUsers);
api.route('/test').get(requestLogger, authenticate, (request, response) => { 
    response.json({ message: 'authenticated' });})
module.exports = api;