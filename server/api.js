const User = require('./models.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

/*
router.route('/authenticate').post((request, response) => {
    User.find({ userName: request.body.userName })
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
*/

router.route('/authenticate').get((request, response) => {
    User.findOne( { $or: 
        [{ userName: request.query.userName },{ email: request.query.email }]}).exec()
        .then( (user) => bcrypt.compare(request.query.password, user.password))
        .then( (isMatch) => {
            if(isMatch) {
                response.json({ sessionToken: 'TODO'});
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