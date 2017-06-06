const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AnswerSchema = new Schema({
  collaborationId: String,
  userId: String,
  questionId: Number,
  prompt: String,
  text: String,
  name: String,
  },{
    timestamps: true,
  });

const AnswerModel = mongoose.model('Answer', AnswerSchema);
module.exports = AnswerModel;
