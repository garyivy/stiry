import React from 'react';
import { connect } from 'react-redux';

import Question from './Question.jsx';
import StepIndicator from './StepIndicator.jsx';
import PrimaryButton from './../../shared/PrimaryButton.jsx';

import {
    gotoPreviousQuestion,
    gotoNextQuestion,
    submitQuestionnaire
} from './../../actions/collaborationActionCreators.js';

export const QuestionnairePresentation = ({
    collaborationName, shouldShowPreviousButton, onPreviousButtonClick,
    shouldShowSubmitButton, onNextButtonClick, onSubmitButtonClick }) => {

    const previousButton = shouldShowPreviousButton
        ? <button onClick={onPreviousButtonClick}>Previous Question</button>
        : null;

    const nextButton = shouldShowSubmitButton
        ? <PrimaryButton onClick={onSubmitButtonClick}>Submit</PrimaryButton>
        : <PrimaryButton onClick={onNextButtonClick}>Next Question</PrimaryButton>;

    const onSubmit = event => {
        event.preventDefault();
    }

    return (
        <div className="questionnaire-container">
            <h1>The Stiry Questionnaire</h1>
            <h2>Collaboration Name: {collaborationName}</h2>
            <StepIndicator />
            <form onSubmit={onSubmit}>
                <Question />
                <div className="button-container">
                    {previousButton}
                    {nextButton}
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = ({ collaboration }) => {
    // Note: Pick only the values you need (versus a less verbose ...collaboration) because redux's shallow comparison would result in unnecessary renders
    return {
        shouldShowPreviousButton: collaboration.shouldShowPreviousButton,
        shouldShowSubmitButton: collaboration.shouldShowSubmitButton,
        collaborationName: collaboration.collaborationName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPreviousButtonClick: () => dispatch(gotoPreviousQuestion()),
        onNextButtonClick: () => dispatch(gotoNextQuestion()),
        onSubmitButtonClick: () => dispatch(submitQuestionnaire())
    }
}

const Questionnaire = connect(mapStateToProps, mapDispatchToProps)(QuestionnairePresentation);

export default Questionnaire;

