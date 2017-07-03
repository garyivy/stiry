/*
const shortId = require('shortid');
const lowdb = require('lowdb');
const db = lowdb('db.json');
const User = require('./User.js');

var pg = require('pg');
var conString = "postgres://admin:admin@localhost:5432/YourDatabase";

var client = new pg.Client(conString);
client.connect();

//queries are queued and executed one after another once the connection becomes available
var x = 1000;

while (x > 0) {
    client.query("INSERT INTO junk(name, a_number) values('Ted',12)");
    client.query("INSERT INTO junk(name, a_number) values($1, $2)", ['John', x]);
    x = x - 1;
}

var query = client.query("SELECT * FROM junk");
//fired after last row is emitted

query.on('row', function(row) {
    console.log(row);
});

query.on('end', function() {
    client.end();
});


db.defaults({ users: [], collaborations: [], answers: [] })
  .write();

const getAnswers = () => db.get('answers');

function Answer(props) {
  if(props) {
    this._id = props._id || null; 
    this.collaborationId = props.collaborationId;
    this.user = props.user;
    this.scrambledUser = props.scrambledUser;
    this.questionId = props.questionId;
    this.prompt = props.prompt;
    this.text = props.text;
  }

  this._getProps = () => {
    return {
      _id: this._id,
      collaborationId: this.collaborationId,
      user: this.user,
      scrambledUser: this.scrambledUser,
      questionId: this.questionId,
      prompt: this.prompt,
      text: this.text
    };
  }

  this.save = () => {
    if(!this._id) {
      this._id = shortId.generate();
      User.findOne({ _id: this.user }).exec().then(user => {
        this.user = user;
        getAnswers().push(this._getProps()).write();
      });
    } else {
      console.log('Saving');
      console.log(this._getProps());
      User.findOne({ _id: this.scrambledUser }).exec().then(user => {
        this.scrambledUser = user;
        getAnswers().find({_id: this.id}).assign(this._getProps()).write();
      });
    }
  }

  this._find = (filter) => {
    this.query = getAnswers().filter(filter);
    return this;
  }

  this.sort = (sortBy) => {
    console.log('sorting');
    try
    {
    this.query = this.query.sortBy('questionId');

    }
    catch(e) {
      console.log(e);
    }
    return this;
  }

  this.populate = (propertyName) => {
    console.log('populate');
    return this;
  }

  this.exec = () => {
    console.log('Exec');
    let result = this.query.value().map(v => new Answer(v));
    console.log(result);
    return Promise.resolve(result);
  }
}

Answer.find = function(filter) {
  var q = new Answer();
  return q._find(filter);
}

module.exports = Answer;

*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AnswerSchema = new Schema({
  collaborationId: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  scrambledUser: {type: Schema.Types.ObjectId, ref: 'User'},  
  questionId: Number,
  prompt: String,
  text: String
  },{
    timestamps: true,
  });

const AnswerModel = mongoose.model('Answer', AnswerSchema);
module.exports = AnswerModel;
