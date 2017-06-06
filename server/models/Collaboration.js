// This reqpresents a collaboration where a group of users can start/join and submit their questionnaires.
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const confidential = require('./../common/confidential.js');

const Schema = mongoose.Schema;
const CollaborationSchema = new Schema({
  name: String,
  status: String,
  startingUserId: String,
  userIds: [String]
  },{
    timestamps: true,
  });

CollaborationSchema.methods = {

  /**
   * Generates a JSON Web token used to associate questionnaire submitals with Collaboration IDs
   * @public
   * @return {String} signed JSON web token
   */
  generateCollaborationToken() {
    return jwt.sign({ _id: this._id }, confidential.JWT_COLLABORATION_TOKEN_SECRET, {
      expiresIn: 720,
    });
  }
};

const CollaborationModel = mongoose.model('Collaboration', CollaborationSchema);
module.exports = CollaborationModel;
