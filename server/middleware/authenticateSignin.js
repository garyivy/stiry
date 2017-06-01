const jwt = require('jsonwebtoken');
const User = require('./../models/User.js');

module.exports = (request, response, next) => {
  User.findOne({
    $or: [
      { userName: request.body.userName },
      { email: request.body.userName }]
  }).exec().then((user) => {
    request.user = user; // Attaching user to request for downstream use (such as generating a session token)

    return user && user.authenticate(request.body.password)
      ? next()
      : response.statusCode(statusCodes.UNAUTHORIZED_401);
  });
}
