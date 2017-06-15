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
    let errorCount = 0;

    request.body.answers.map(answer => {
        let newAnswer = new Answer({
            collaborationId: request.collaborationId,
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
}

module.exports.onGetStatusSimple = (request, response) => {
    Collaboration.findOne({ _id: request.collaborationId }).populate('users').exec().then((collaboration) => {
        response.json(collaboration);
    });
}

const scramble = (collaboration, usersWithAnswers) => {
    // Note: Sorting of user by _id and answers by questionId assumed at this point
    let l = usersWithAnswers.length;
    console.log(usersWithAnswers);
    console.log('length = ' + l);
    for (let q = 0; q < 6; q++) {
        for (let u = 0; u < l; u++) {
            let s = (q + u + 1) % l;
            let scrambledUser = usersWithAnswers[s].userId;
            console.log('scrambledUser = ' + s);
            console.log('scrambledUser = ' + scrambledUser);
            usersWithAnswers[u].answers[q].scrambledUser = scrambledUser;
            usersWithAnswers[u].answers[q].save();
        }
    }
}

const getCollaboration = (id, callback) => {
    // TODO: Refactor
    Collaboration.findOne({ _id: id }).sort({ user: 1 }).populate('users').exec().then((collaboration) => {
        Answer.find({ collaborationId: id }).sort({ questionId: 1, user: 1 }).populate('user').exec().then((answers) => {
            let usersWithAnswers = [];
            collaboration.users.forEach((u) => {
                let userAnswers = answers.filter(a => a.user._id.toString() == u._id.toString());
                usersWithAnswers.push({ userName: u.userName, userId: u._id, answers: userAnswers });
            });

            // TODO: Remove
            console.log('taking count');
            let incompleteSurveyCount = usersWithAnswers.filter(u => u.answers.length < 6).length;
            console.log(incompleteSurveyCount);
            if (incompleteSurveyCount) {
                mockUsers.forEach(u => {
                    for (let i = 1; i < 7; i++) {
                        let answer = new Answer({
                            collaborationId: id,
                            user: u._id,
                            scrambledUser: null,
                            questionId: i,
                            prompt: i + '?',
                            text: u.userName + i
                        });
                        console.log('saving mock answer');
                        answer.save((error) => console.log(error));
                    }

                });
            } else {
                if (usersWithAnswers.length && usersWithAnswers[0].answers.length && !usersWithAnswers[0].answers[0].scrambledUser) {
                    console.log('SCRAMBLING');
                    scramble(collaboration, usersWithAnswers);
                }
            }
            callback(collaboration, usersWithAnswers);
        })
    })
}


const getScramble = (id, callback) => {
    // TODO: Refactor
    Collaboration.findOne({ _id: id }).populate('users').exec().then((collaboration) => {
        Answer.find({ collaborationId: id }).populate('scrambledUser').sort({ questionId: 1 }).exec().then((answers) => {
            //console.log(answers);
            try {
                let usersWithAnswers = [];
                collaboration.users.forEach((u) => {
                    let userAnswers = answers.filter(a => {
                        
                        console.log('user');
                        console.log(u);
                        console.log('answer');
                        console.log(a);
                        
                        return a.scrambledUser._id.toString() == u._id.toString()
                    });
                    usersWithAnswers.push({ userName: u.userName, userId: u._id, answers: userAnswers });
                });

                callback(collaboration, usersWithAnswers);

            } catch (e) {
                console.log(e);
            }
        })
    })
}


module.exports.onGetStatus = (request, response) => {
    getCollaboration(request.collaborationId, (collaboration, usersWithAnswers) => {
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
}


module.exports.onGetScrambled = (request, response) => {
    getScramble(request.collaborationId, (collaboration, usersWithAnswers) => {
        try {
            return response.json({ payload: usersWithAnswers });
        }
        catch (e) {
            console.log(e);
        }
    });
}
