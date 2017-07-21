const User = require('./../models/User.js');
const statusCodes = require('./../common/statusCodes.js');
const confidential = require('./../common/confidential.js');

function sendMail(userEmail, passwordResetToken) {
    var ses = require('node-ses')
        , client = ses.createClient({ key: confidential.AMAZON_WEB_SERVICES_KEY, secret: confidential.AMAZON_WEB_SERVICES_SECRET });

    // Give SES the details and let it construct the message for you.
    client.sendEmail({
        to: userEmail
        , from: 'stirytimewebsite@gmail.com'
        , cc: ''
        , bcc: ''
        , subject: 'Password Reset'
        , message: 'Click this link to reset your Stirytime account: <a href="https://www.stirytime.com/reset?' + token + '>Click Here.'
        , altText: 'Token=' + token
    }, function (err, data, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Sent password reset to ' + userEmail)
        }
    });
}


// TODO: Remove this or restrict to admin users
module.exports.onGetUsers = (request, response) => {
    User.find().exec()
        .then((users) => response.json(users));
}

module.exports.onRegisterNewUser = (request, response) => {
    //sendMail();

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
    console.log('Password reset request');
    try {
    User.findOne(
        {
            email: request.body.email
        }).exec().then((user) => {
            if (!user) {
                return response.status(statusCodes.FAILED_DEPENDENCY_424).json({})
            }

            let token = user.generatePasswordResetToken();
            sendMail(request.body.email, token);
            // TODO: Send token via email instead of response :)
            return token
                ? response.json({ resetLink: '/reset?' + token })
                : response.json({ resetLink: null });
        });

    } catch(e) {
        console.log(e);
        response.status(statusCodes.UNAUTHORIZED_401).json({});
    }
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
