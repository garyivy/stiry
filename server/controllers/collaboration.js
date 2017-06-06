const Collaboration = require('./../models/Collaboration.js');
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
