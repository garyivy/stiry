const jwt = require('jsonwebtoken');
const confidential = require('./../common/confidential.js');
const statusCodes = require('./../common/statusCodes.js');

module.exports = (request, response, next) => {
  let token = request.headers.authorization;

  if (!token) {
    return response.status(statusCodes.UNAUTHORIZED_401)
      .json({ message: 'Missing authorization token.' });
  }

  jwt.verify(token, confidential.JWT_SESSION_TOKEN_SECRET,
    (error, decoded) => {
      if (error || !decoded._id) {
        return response.status(statusCodes.UNAUTHORIZED_401)
          .json({ message: 'Invalid authorization token.' });
      }

      request.userId = decoded._id; // Attaching user ID for possible downstream lookup of user (No explicit need for lookup at this point).
      next();
    });
}

