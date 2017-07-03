const authenticate = require('./middleware/authenticate.js');
const authenticatePasswordResetToken = require('./middleware/authenticatePasswordResetToken.js');
const authenticateSignin = require('./middleware/authenticateSignin.js');
const requestLogger = require('./middleware/requestLogger.js');
const user = require('./controllers/user.js');
const collaboration = require('./controllers/collaboration.js');
const ensureCollaborationToken = require('./middleware/ensureCollaborationToken.js');
const express = require('express');
const api = express.Router();

const onPlaceholder = (request, response) => response.status(500).json({ message: 'Under Construction' })
const fakeAuthenticate = (request, response, next) => {
    request.userId = 'fake';
    next();
}

//api.use(requestLogger);

api.route('/register').post(user.onRegisterNewUser);
api.route('/users').post(user.onRegisterNewUser);
api.route('/signin').post(authenticateSignin, user.onSignin);
api.route('/signout').post(onPlaceholder);
api.route('/forgot').post(user.onForgotPassword);
api.route('/reset').post(authenticatePasswordResetToken, user.onResetPassword);

api.route('/start').post(authenticate, collaboration.onStartCollaboration);
api.route('/join').post(authenticate, collaboration.onJoinCollaboration);
api.route('/collaborationStatus/:collaborationToken').get(authenticate, ensureCollaborationToken, collaboration.onGetStatus);
api.route('/questionnaires').post(authenticate, ensureCollaborationToken, collaboration.onSubmitQuestionnaire);
api.route('/scrambled/:collaborationToken').get(authenticate, ensureCollaborationToken, collaboration.onGetScrambled);

api.route('/collaborations').get(collaboration.onGetCollaborations);
api.route('/answers').get(collaboration.onGetAnswers);
api.route('/users').get(user.onGetUsers);
api.route('/test').get(requestLogger, authenticate, (request, response) => { 
    response.json({ message: 'authenticated' });})
module.exports = api;