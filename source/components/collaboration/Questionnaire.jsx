import React from 'react';
import { connect } from 'react-redux';
import StepIndicator from './StepIndicator.jsx';
import QuestionForm from './QuestionForm.jsx';

export const Questionnaire = ({ collaborationCode }) => (
    <main className="questionnaire-container">
        <h1>The Stirytime Questionnaire</h1>
        <h2>Collaboration Code: {collaborationCode}</h2>
        <StepIndicator />
        <QuestionForm />
    </main>
)

const mapStateToProps = ({ collaboration }) => {
    return {
        collaborationCode: collaboration.collaborationCode
    }
}

export default connect(mapStateToProps)(Questionnaire);


