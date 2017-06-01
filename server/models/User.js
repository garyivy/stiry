// Based on to github.com/kylealwyn/node-rest-api-boilerplate.  Thanks!
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const confidential = require('./../common/confidential.js');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    unique: true,
    required: [true, 'User Name is required.']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email is required.'],
    validate: [
      {
        validator: (email) => {
          // eslint-disable-next-line max-len
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
          var isValid = emailRegex.test(email);
          return isValid;
        },
        msg: '{VALUE} is not a valid email address.'
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  role: {
    type: String,
    default: 'user',
  },
}, {
    timestamps: true,
  });

// Strip out password field when sending user object to client
UserSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.password;
    return obj; // TODO: When might I use this?
  },
});

// Ensure email has not been taken
UserSchema
  .path('email')
  .validate((email, respond) => {
    UserModel.findOne({ email })
      .then((user) => {
        respond(user ? false : true);
      })
      .catch(() => {
        respond(false);
      });
  }, 'Email already in use.'); // TODO: Provide client side lookup before submission.

// Validate username is not taken
UserSchema
  .path('userName')
  .validate((username, respond) => {
    UserModel.findOne({ username })
      .then((user) => {
        respond(user ? false : true);
      })
      .catch(() => {
        respond(false);
      });
  }, 'User Name already taken.');

// Validate password field
UserSchema
  .path('password')
  .validate(function (password) {
    return password.length >= 8;
  }, 'Password be at least 8 characters long.');  // TODO: Be consistent with front-end (currently at 6 max).
//
UserSchema
  .pre('save', function (done) {
    if (!this.isModified('password')) {
      done();
      return;
    }

    // Encrypt password before saving.
    bcrypt.hash(this.password, confidential.BCRYPT_SALT_ROUNDS).then((hash) => {
      this.password = hash;
      done();
    });
  });

/**
 * User Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   * @public
   * @param {String} password
   * @return {Boolean} passwords match
   */
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },

  /**
   * Generates a JSON Web token used for "session" authentication expected in headers of private REST calls
   * @public
   * @return {String} signed JSON web token
   */
  generateSessionToken() {
    return jwt.sign({ _id: this._id }, confidential.JWT_SESSION_TOKEN_SECRET, {
      expiresIn: 3600,
    });
  },

  /**
   * Generates a JSON Web token used for password reset
   * @public
   * @return {String} signed JSON web token
   */
  generatePasswordResetToken() {
    return jwt.sign({ _id: this._id }, confidential.JWT_PASSWORD_RESET_AUTHENTICATION_SECRET, {
      expiresIn: 300,
    });
  },

  getDisplayName() {
    return this.firstName && this.lastName
      ? this.firstName + ' ' + this.lastName // TODO: Future Use?
      : this.userName;
  }
};

// Note: When listing this as a dependency via require, inconsistent casing can result in a mongoose "Cannot overwrite" error.
// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose 
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
