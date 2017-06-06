const Collaboration = require('./../models/Collaboration.js');
const Answer = require('./../models/Answer.js');
const jwt = require('jsonwebtoken');
const User = require('./../models/User.js');
const confidential = require('./../common/confidential.js');
const statusCodes = require('./../common/statusCodes.js');

// TODO: Remove this or restrict to admin users
module.exports.onGetCollaborations = (request, response) => {
    Collaboration.find().exec()
        .then((collaborations) => response.json(collaborations));
}

module.exports.onStartCollaboration = (request, response) => {
    let collaboration = new Collaboration({
        name: request.body.collaborationName || 'test',
        status: 'starting',
        startingUserId: request.userId, // Note: provided by authenticate middleware
        userIds: [request.userId]
    });

    collaboration.save((error) => {
        return error
            ? response.status(statusCodes.BAD_REQUEST_400).json({ message: error.message }) // TODO: What if it failed other than "Bad Request"
            : response.send({
                message: 'Collaboration started.',
                collaborationToken: collaboration.generateCollaborationToken(),
                collaborationName: collaboration.name
            });
    });
}

module.exports.onJoinCollaboration = (request, response) => {
    Collaboration.findOne({
        name: request.body.collaborationName || 'test' // TODO: More needed here to get recently started session
    }).exec().then((collaboration) => {
        if (!collaboration) {
            return response.json({ collaborationToken: null });
        }

        collaboration.userIds.push(request.userId);
        collaboration.save((error) => {
            return error
                ? response.status(statusCodes.BAD_REQUEST_400).json({ message: error.message })
                : response.send({
                    message: 'Collaboration started.',
                    collaborationToken: collaboration.generateCollaborationToken(),
                    collaborationName: collaboration.name
                });
        });
    });
}

module.exports.onSubmitQuestionnaire = (request, response) => {
    let token = request.body.collaborationToken;
    let decoded = jwt.verify(token, confidential.JWT_COLLABORATION_TOKEN_SECRET,
        (error, decoded) => {
            if (error) {
                return response.status(statusCodes.UNAUTHORIZED_401)
                    .json({ message: 'Invalid collaboration token.' });
            }

            request.body.answers.map(answer => {
                let newAnswer = new Answer({
                    collaborationId: decoded._id,
                    userId: request.userId,
                    questionId: answer.id,
                    prompt: answer.prompt,
                    text: answer.text
                })
                newAnswer.save();
            });
        });
}