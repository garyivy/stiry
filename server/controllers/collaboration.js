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

// TODO: Remove this or restrict to admin users
module.exports.onGetAnswers = (request, response) => {
    Answer.find().exec()
        .then((answers) => response.json(answers));
}

let mockUsers = [];
User.findOne({ userName: 'g1' }).exec().then(u => mockUsers.push(u));
User.findOne({ userName: 'g2' }).exec().then(u => mockUsers.push(u));
User.findOne({ userName: 'g3' }).exec().then(u => mockUsers.push(u));
User.findOne({ userName: 'g4' }).exec().then(u => mockUsers.push(u));
User.findOne({ userName: 'g5' }).exec().then(u => mockUsers.push(u));

module.exports.onStartCollaboration = (request, response) => {
    let collaboration = new Collaboration({
        name: request.body.collaborationName || 'test',
        status: 'starting',
        startingUser: request.userId, // Note: provided by authenticate middleware
        users: [request.userId]
    });

    mockUsers.forEach(u => { console.log(u); collaboration.users.push(u._id); });

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

        collaboration.users.push(request.userId);
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
                    .json({ message: 'Invalid collaboration token.' }); // TODO: What is real value of using token instead of ID here? expiration?
            }

            let errorCount = 0;

            request.body.answers.map(answer => {
                let newAnswer = new Answer({
                    collaborationId: decoded._id,
                    user: request.userId,
                    scrambledUser: null,
                    questionId: answer.id, // TODO: Rename for consistency?
                    prompt: answer.prompt,
                    text: answer.text
                })
                newAnswer.save((error) => {
                    if (error) {
                        console.log(error);
                        errorCount++;
                    }
                });
            });

            return errorCount == 0
                ? response.json({ message: 'Questionnaire saved.' })
                : response.status(statusCodes.INTERNAL_SERVER_ERROR_500)
                    .json({ message: 'Error while saving collaboration' });
        });
}

module.exports.onGetStatusSimple = (request, response) => {
    let token = request.params.collaborationToken;
    let decoded = jwt.verify(token, confidential.JWT_COLLABORATION_TOKEN_SECRET,
        (error, decoded) => {
            if (error) {
                return response.status(statusCodes.UNAUTHORIZED_401)
                    .json({ message: 'Invalid collaboration token.' }); // TODO: What is real value of using token instead of ID here? expiration?
            }

            Collaboration.findOne({ _id: decoded._id }).populate('users').exec().then((collaboration) => {
                response.json(collaboration);
            });
        });
}

const scramble = (collaboration, usersWithAnswers) => {
    // Note: Sorting of user by _id and answers by questionId assumed at this point
    let l = usersWithAnswers.length;
    console.log('length = ' + l);
    for(let q = 0; q < 6; q++){
        for(let u = 0; u < l; u++) {
            let s = (q + u + 1) % l;
            let scrambledUser = usersWithAnswers[s]._id;
            console.log('scrambledUser = ' + s);
            usersWithAnswers[u].answers[q].scrambledUser = scrambledUser;
            usersWithAnswers[u].answers[q].save();
        }
    }
}

const getCollaboration = (id, callback) => {
    // TODO: Refactor
    Collaboration.findOne({ _id: id }).sort({ user: 1}).populate('users').exec().then((collaboration) => {
        Answer.find({ collaborationId: id }).sort({ questionId: 1, user: 1}).populate('user').exec().then((answers) => {
            let usersWithAnswers = [];
            collaboration.users.forEach((u) => {
                let userAnswers = answers.filter(a => a.user._id.toString() == u._id.toString());
                usersWithAnswers.push({ userName: u.userName, answers: userAnswers });
            });

            // TODO: Remove
            console.log('taking count');
            let incompleteSurveyCount = usersWithAnswers.filter(u => u.answers.length < 6).length;
            console.log(incompleteSurveyCount);
            if (incompleteSurveyCount ) {
                mockUsers.forEach(u => {
                    for (let i = 1; i < 7; i++) {
                        let answer = new Answer({
                            collaborationId: id,
                            user: u._id,
                            questionId: i,
                            prompt: i + '?',
                            text: u.userName + i
                        });
                        console.log('saving mock answer');
                        answer.save((error) => console.log(error));
                    }

                });
            } else {
                console.log( usersWithAnswers[0]);
                if(usersWithAnswers.length && usersWithAnswers[0].answers.length && !usersWithAnswers[0].answers[0].scrambledUser) {
                    scramble(collaboration, usersWithAnswers);
                }
            }
            callback(collaboration, usersWithAnswers);
        })
    })
}

module.exports.onGetStatus = (request, response) => {
    let token = request.params.collaborationToken;
    let decoded = jwt.verify(token, confidential.JWT_COLLABORATION_TOKEN_SECRET,
        (error, decoded) => {
            if (error) {
                return response.status(statusCodes.UNAUTHORIZED_401)
                    .json({ message: 'Invalid collaboration token.' }); // TODO: What is real value of using token instead of ID here? expiration?
            }

            getCollaboration(decoded._id, (collaboration, usersWithAnswers) => {
                try {
                    let incompleteSurveyCount = usersWithAnswers.filter(u => u.answers.length < 6).length;
                    let userStatuses = usersWithAnswers.map(u => { return { userName: u.userName, answersRemaining: 6 - u.answers.length } });
                    let isScrambled = usersWithAnswers.length && usersWithAnswers[0].answers.length && !usersWithAnswers[0].answers[0].scrambledUser;
                    let result = { incompleteSurveyCount, userStatuses, isScrambled };

                    return response.json(result);

                }
                catch (e) {
                    console.log(e);
                }
            });
        });
}
