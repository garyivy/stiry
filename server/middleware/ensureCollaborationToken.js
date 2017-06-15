const jwt = require('jsonwebtoken');
const confidential = require('./../common/confidential.js');
const statusCodes = require('./../common/statusCodes.js');

module.exports = (request, response, next) => {
  let token = request.params.collaborationToken || request.body.collaborationToken;

  jwt.verify(token, confidential.JWT_COLLABORATION_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        return response.status(statusCodes.UNAUTHORIZED_401)
          .json({ message: 'Invalid collaboration token.' });
      }

      request.collaborationId = decoded._id;
      next();
    });
}

