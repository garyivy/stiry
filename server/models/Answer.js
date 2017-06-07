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
