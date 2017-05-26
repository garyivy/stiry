var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema = new Schema({
  userName: String,
  email: String,
  password: String
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);