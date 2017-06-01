const User = require('./../models/User.js');
const statusCodes = require('./../common/statusCodes.js');

// TODO: Remove this or restrict to admin users
module.exports.onGetUsers = (request, response) => {
    User.find().exec()
        .then((users) => response.json(users));
}

module.exports.onRegisterNewUser = (request, response) => {
    let user = new User({
        userName: request.body.userName,
        email: request.body.email,
        password: request.body.password,
    });

    user.save((error) => {
        return error
            ? response.status(statusCodes.BAD_REQUEST_400).json({ message: error.message }) // TODO: What if it failed other than "Bad Request"
            : response.send({
                sessionToken: user.generateSessionToken(),
                userDisplayName: user.getDisplayName(),
                message: 'User added.'
            });
    });
}

module.exports.onSignin = (request, response) => {
    // Note: At this point, authenticateSignin middleware should have populated request.user
    return response.json({
        sessionToken: request.user.generateSessionToken(),
        userDisplayName: request.user.getDisplayName()
    });
}

module.exports.onForgotPassword = (request, response) => {
    User.findOne({
        $or:
        [{ userName: request.query.userName },
        { email: request.query.userName }]
    }).exec().then((user) => {
        if (!user) {
            return response.json({ resetToken: null }); // TODO: What is the best status/message to send to the client here?
        }

        let token = user.generatePasswordToken();

        // TODO: Send token via email instead of response :)
        return user
            ? response.json({ resetToken: token })
            : response.json({ resetToken: null });
    });
}

module.exports.onResetPassword = (request, response) => {
    // Note: At this point, authenticatePasswordResetToken middleware should have populated request.user
    request.user.password = request.body.password;
    request.user.save();

    response.json({
        sessionToken: request.user.generateSessionToken(),
        userDisplayName: request.user.getDisplayName()
    });
}
