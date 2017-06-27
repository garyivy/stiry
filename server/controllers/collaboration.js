const Collaboration = require('./../models/Collaboration.js');
const Answer = require('./../models/Answer.js');
const jwt = require('jsonwebtoken');
const User = require('./../models/User.js');
const confidential = require('./../common/confidential.js');
const statusCodes = require('./../common/statusCodes.js');

const QUESTION_COUNT = 6;

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
        name: request.body.collaborationName,
        status: 'starting',
        startingUser: request.userId, // Note: provided by authenticate middleware
        users: [request.userId]
    });

    //mockUsers.forEach(u => { collaboration.users.push(u._id); });

    collaboration.save((error) => {
        return error
            ? response.status(statusCodes.BAD_REQUEST_400).json({ message: error.message }) 
            : response.send({
                message: 'Collaboration started.',
                collaborationToken: collaboration.generateCollaborationToken(),
                collaborationName: collaboration.name
            });
    });
}

module.exports.onJoinCollaboration = (request, response) => {
    Collaboration.findOne({
        name: request.body.collaborationName 
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
            questionId: answer.id, 
            prompt: answer.prompt,
            text: answer.text
        })
        newAnswer.save((error) => {
            if (error) {
                errorCount++;
            }
        });
    });

    return errorCount == 0
        ? response.json({ message: 'Questionnaire saved.' })
        : response.status(statusCodes.INTERNAL_SERVER_ERROR_500)
            .json({ message: 'Error while saving collaboration' });        
}

const scramble = (collaboration, usersWithAnswers) => {
    // Note: Sorting of user by _id and answers by questionId assumed at this point
    let l = usersWithAnswers.length;
    for (let q = 0; q < QUESTION_COUNT; q++) {
        for (let u = 0; u < l; u++) {
            let s = (q + u + 1) % l;
            let scrambledUser = usersWithAnswers[s].userId;
            usersWithAnswers[u].answers[q].scrambledUser = scrambledUser;
            usersWithAnswers[u].answers[q].save();
        }
    }
}

const getCollaboration = (id, callback) => {
    Collaboration.findOne({ _id: id }).sort({ user: 1 }).populate('users').exec().then((collaboration) => {

        Answer.find({ collaborationId: id }).sort({ questionId: 1, user: 1 }).populate('user').exec().then((answers) => {
            let usersWithAnswers = [];
            collaboration.users.forEach((u) => {
                let userAnswers = answers.filter(a => a.user._id.toString() == u._id.toString());
                usersWithAnswers.push({ userName: u.userName, userId: u._id, answers: userAnswers });
            });

            let incompleteSurveyCount = usersWithAnswers.filter(u => u.answers.length < QUESTION_COUNT).length;
            
            if (incompleteSurveyCount) {
                /*
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
                        answer.save((error) => console.log(error));
                    }

                });
                */
            } else {
                if (usersWithAnswers.length && usersWithAnswers[0].answers.length && !usersWithAnswers[0].answers[0].scrambledUser) {
                    scramble(collaboration, usersWithAnswers);
                }
            }
            callback(collaboration, usersWithAnswers);
        })
    })
}



module.exports.onGetStatus = (request, response) => {
    getCollaboration(request.collaborationId, (collaboration, usersWithAnswers) => {
        try {
            let incompleteSurveyCount = usersWithAnswers.filter(u => u.answers.length < QUESTION_COUNT).length;
            let userStatuses = usersWithAnswers.map(u => { return { userName: u.userName, answersRemaining: QUESTION_COUNT - u.answers.length } });
            let isScrambled = usersWithAnswers.length && usersWithAnswers[0].answers.length && !usersWithAnswers[0].answers[0].scrambledUser;
            let result = { incompleteSurveyCount, userStatuses, isScrambled };

            return response.json(result);

        }
        catch (e) {
            console.log(e);
        }
    });
}

const getScramble = (id, userId, callback) => {
    Collaboration.findOne({ _id: id }).populate('users').exec().then((collaboration) => {
        Answer.find({ collaborationId: id }).populate('scrambledUser').sort({ questionId: 1 }).exec().then((answers) => {
            try {
                let scrambledAnswers;
                collaboration.users.forEach((u) => {
                    if(u._id.toString() === userId) {
                        scrambledAnswers = answers.filter(a => {
                            return a.scrambledUser._id.toString() == u._id.toString()})
                    }});
                callback(collaboration, scrambledAnswers);
            } catch (e) {
                console.log(e);
            }
        })
    })
}

module.exports.onGetScrambled = (request, response) => {
    getScramble(request.collaborationId, request.userId, (collaboration, scrambledAnswers) => {
        try {
            return response.json({ payload: scrambledAnswers });
        }
        catch (e) {
            console.log(e);
        }
    });
}
