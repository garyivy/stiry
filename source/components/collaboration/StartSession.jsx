import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { startCollaboration } from './../../actions/collaborationActionCreators.js';
import { Link } from 'react-router-dom';
import PrimaryButton from './../../shared/PrimaryButton.jsx';

export const StartSession = ({ onSubmit, error }) => (
    <div>
        <h1>Start a Stiry Collaboration</h1>
        <form onSubmit={onSubmit}>
            <div className="field">
                <div>
                    <PrimaryButton>Start</PrimaryButton>
                </div>
            </div>
            {error && <label className="error">{error}</label>}
        </form>
        <p className="responsive-content-regular">
            After clicking "Start", you will be shown the questionnairre.  At the TOP of the questionnaire will be a six-digit code to share with others that you want to join the collaboration.A collaboration name is needed to group participants together.
        </p>
        <p className="responsive-content-small">
            Note: Stirytime groups participants using a collaboration code.
            <br /><br />
            This code will be provided once you click "Start"
        </p>
    </div>
);

const mapStateToProps = ({ collaboration }) => {
    return {
        error: collaboration.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (event) => {
            event.preventDefault();
            dispatch(startCollaboration('DEPRECATED'));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartSession);



