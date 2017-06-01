const jwt = require('jsonwebtoken');
const User = require('./../models/User.js');
const confidential = require('./../common/confidential.js');

module.exports = (request, response, next) => {
  let token = request.body.resetToken;

  if (!token) {
    return response.status(statusCodes.UNAUTHORIZED_401)
      .json({ message: 'Missing authorization token.' });
  }

  let decoded = jwt.verify(token, confidential.JWT_PASSWORD_RESET_AUTHENTICATION_SECRET,
    (error, decoded) => {
      if (error) {
        return this.response.status(statusCodes.UNAUTHORIZED_401)
          .json({ message: 'Invalid authorization token.' });
      }

      validateUser(decoded._id, request, response, next);
    });
}

function validateUser(userId, request, response, next) {
  User.findById(userId).exec().then((user) => {
    if (!user) {
      return this.response.status(statusCodes.UNAUTHORIZED_401)
        .json({ message: 'Invalid user.' });
    }

    request.user = user; // Attaching user to request for downstream update of user's password.
    next();
  });
}
