import React from 'react';
import { connect } from 'react-redux';
import SingleInputForm from './SingleInputForm.jsx';
import { joinCollaboration } from './../actions/collaborationActionCreators.js';
import { joinCollaborationAsGuest } from './../actions/collaborationActionCreators.js';

export const joinCollaborationForm = ({
    isGuest, onJoin, onJoinAsGuest, error}) => (
     <SingleInputForm
        type="number"
        name="collaborationCode"
        prompt="Collaboration Code"
        shortPrompt="Code"
        buttonText={ isGuest ? 'Join as Guest' : 'Join' }
        shortButtonText="Join"
        onSubmitValue={ isGuest ? onJoinAsGuest : onJoin }
        error={error}
    />
);

const mapStateToProps = ({collaboration}) => {
    return {
        error: collaboration.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // Note: On success, these redirect to /questionnaire.  On failure, collaboration.error is set.
        onJoin: (collaborationCode) => dispatch(joinCollaboration(collaborationCode)),
        onJoinAsGuest: (collaborationCode) => dispatch(joinCollaborationAsGuest(collaborationCode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(joinCollaborationForm);