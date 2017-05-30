const User = require('./models.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticate = require('./authenticate.js');

const updateUserPassword = (user, password) => {
    bcrypt.hash(password, 12).then((hash) => {
        user.password = hash;
        user.save();
    });
}

router.route('/test').get( authenticate, (request, response) => { 
    response.json({ message: 'authenticated'});
})

router.route('/login').post((request, response) => {
    let locatedUser = null;
    User.findOne( { $or: 
        [{ userName: request.body.userName },{ email: request.body.userName }]}).exec()
        .then( (user) => {  
            request.currentUser = user; 
            // TODO: Handle null user?
            bcrypt.compare(request.body.password, user.password)
            .then( (isMatch) => {
                if(isMatch) {
                    var userDisplayName = user.userName;
                    if(user.firstName && user.lastName) {
                        userDisplayName = user.firstName + ' ' + user.lastName;
                    }
                    response.json({ sessionToken: user.generateToken(), userDisplayName: userDisplayName }); 
                }
                else {
                    response.status(401).json({ sessionToken: null});
                }
            })
        })
        .catch((error) => {
            console.log(error);
            response.status(401).json({ sessionToken: null});
        });
});

router.route('/reset').get((request, response) => {
    var tempPassword = "password"; // TODO: Generate a better temporary password :)
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
                console.log(error);
                return response.status(400).json({ message: error.message }); // TODO: What if it failed other than "Bad Request"
            }
            response.send({ message: 'User Added' });
        })
    });
});

module.exports = router;