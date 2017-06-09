const jwt = require('jsonwebtoken');
const User = require('./../models/User.js');
const statusCodes = require('./../common/statusCodes.js');

module.exports = (request, response, next) => {
  User.findOne({
    $or: [
      { userName: request.body.userName },
      { email: request.body.userName }]
  }).exec().then((user) => {
    request.user = user; // Attaching user to request for downstream use (such as generating a session token)

    return user && user.authenticate(request.body.password)
      ? next()
      : response.status(statusCodes.UNAUTHORIZED_401).json({ message: 'Invalid signin.' })
  }).catch((error) => {
    console.log(error);
    return response.status(statusCodes.UNAUTHORIZED_401).json({ message: 'Invalid signin.' })
  });
}
