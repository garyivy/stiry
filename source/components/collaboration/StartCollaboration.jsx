import React from 'react';
import { connect } from 'react-redux';
import { startCollaboration } from './../../actions/collaborationActionCreators.js';
import Form from './../../shared/input/Form.jsx';
import PrimaryButton from './../../shared/input/PrimaryButton.jsx';

export const StartCollaboration = ({ onSubmit, error }) => (
    <main>
        <h1>Start a Stiry Collaboration</h1>
        <Form onSubmit={onSubmit}>
            <PrimaryButton>Start</PrimaryButton>
            {error && <label className="error">{error}</label>}
        </Form>
        <h2>Directions</h2>
        <ul className="responsive-content-regular">
            <li>After clicking "Start", you will be shown the questionnairre.</li>
            <li>At the <b>top</b> of the questionnaire <u>note the six-digit "Collaboration Code"</u>.</li>
            <li>The collaboration code is needed to group participants together and Stirytime their questionnaires.</li>
            <li>Provide this code to other who want to join the collaboration.</li>
            <li>Help newbies register and join the collaboration or join as a unregistered guest.</li>
            <li>Participants have roughly ten minutes to complete the questionnaire. (This includes you.)</li>
            <li>Once all participants have completed their questionnaires, each will recieve a "Stirytime" story to share with the group.</li>
        </ul>
        <ul className="responsive-content-small">
            <li>Clicking "Start" to begin the questionnairre.</li>
            <li>Note the "Collaboration Code" at the <b>top</b> of the questionnaire.</li>
            <li>Fellow participants need this code to join the collaboration.</li>
            <li>Complete the questionnaire.</li>
            <li>Once all participants complete, each will see a "Stirytime" story.</li>
        </ul>
    </main>
);

const mapStateToProps = ({ collaboration }) => {
    return {
        error: collaboration.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // Note: On success, redirects to /questionnaire.  On failure, sets collaboration.error.
        onSubmit: (formValues) => dispatch(startCollaboration())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartCollaboration);



