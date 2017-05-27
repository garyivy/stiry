const User = require('./models.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const updateUserPassword = (user, password) => {
    bcrypt.hash(password, 12).then((hash) => {
        user.password = hash;
        user.save();
    });
}

router.route('/authenticate').post((request, response) => {
    User.findOne( { $or: 
        [{ userName: request.body.userName },{ email: request.body.userName }]}).exec()
        .then( (user) => bcrypt.compare(request.body.password, user.password))
        .then( (isMatch) => {
            if(isMatch) {
                response.json({ sessionToken: 'TODO'}); // TODO: Lots of work/third-party help needed here for client and server.
            }
            else {
                response.status(401).json({ sessionToken: null});
            }
        })
        .catch((error) => {
            console.log(error);
            response.status(401).json({ sessionToken: null});
        });
});

router.route('/reset').get((request, response) => {
    var tempPassword = "todo";
    User.findOne( { $or: 
        [{ userName: request.query.userName },{ email: request.query.userName }]}).exec()
        .then( (user) => { updateUserPassword( user, tempPassword ); response.json({ message: 'password updated'}); })
});

// TODO: Remove this or limit to Admin users
router.route('/users').get((request, response) => {
    User.find().exec()
        .then( (users) => response.json(users));
});

router.route('/users').post((request, response) => {
    bcrypt.hash(request.body.password, 12)
        .then( (hash) => {
             let user = new User({
                userName: request.body.userName,
                email: request.body.email,
                password: hash,
             });
            user.save( (error) => {
            if (error) {
                return response.send(error);
            }
            response.send({ message: 'User Added' });
        })
    });
});

module.exports = router;