// Based on to github.com/kylealwyn/node-rest-api-boilerplate.  Thanks!
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
          console.log('I am validating the format of the email address: ' + email);
          // eslint-disable-next-line max-len
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
          var isValid =  emailRegex.test(email);
          console.log(isValid);
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
    return obj;
  },
});

// Ensure email has not been taken
UserSchema
  .path('email')
  .validate((email, respond) => {
    console.log('I am validating the existance of the email address: ' + email);

    UserModel.findOne({ email })
      .then((user) => {
        respond(user ? false : true);
      })
      .catch(() => {
        respond(false);
      });
  }, 'Email already in use.');

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
    return password.length >= 6 && password.match(/\d+/g);
  }, 'Password be at least 6 characters long and contain 1 number.');

//
UserSchema
  .pre('save', function (done) {
    // Encrypt password before saving the document
    if (this.isModified('password')) {
      this._hashPassword(this.password, 12, (err, hash) => {
        this.password = hash;
        done();
      });
    } else {
      done();
    }
    // eslint-enable no-invalid-this
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
   * Generates a JSON Web token used for route authentication
   * @public
   * @return {String} signed JSON web token
   */
  generateToken() {
    return jwt.sign({ _id: this._id }, 'afraid-of-a-little-bunny', {
      expiresIn: 3600,
    });
  },

  /**
   * Create password hash
   * @private
   * @param {String} password
   * @param {Number} saltRounds
   * @param {Function} callback
   * @return {Boolean} passwords match
   */
  _hashPassword(password, saltRounds = 12, callback) {
    return bcrypt.hash(password, saltRounds, callback);
  },
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;