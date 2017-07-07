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

export const QuestionnairePresentation = ({ windowSize,
    collaborationName, shouldShowPreviousButton, onPreviousButtonClick,
    shouldShowSubmitButton, onNextButtonClick, onSubmitButtonClick }) => {

    let previousQuestionButtonText = windowSize.width < 450 
        ? 'Previous'
        : 'Previous Question';

    let nextQuestionButtonText = windowSize.width < 450 
        ? 'Next'
        : 'Next Question';

    const previousButton = shouldShowPreviousButton
        ? <button onClick={onPreviousButtonClick}>{previousQuestionButtonText}</button>
        : null;

    const nextButton = shouldShowSubmitButton
        ? <PrimaryButton onClick={onSubmitButtonClick}>Submit</PrimaryButton>
        : <PrimaryButton onClick={onNextButtonClick}>{nextQuestionButtonText}</PrimaryButton>;

    let buttons = [];

    if(windowSize.width < 400) {
        // Note: On small devices, show next before previous since the buttons show on separate "lines"
        buttons.push(nextButton);
        buttons.push(previousButton);
    } else {
        buttons.push(previousButton);
        buttons.push(nextButton);
    }

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
                    {buttons}
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = ({ collaboration, windowSize }) => {
    // Note: Pick only the values you need (versus a less verbose ...collaboration) because redux's shallow comparison would result in unnecessary renders
    return {
        shouldShowPreviousButton: collaboration.shouldShowPreviousButton,
        shouldShowSubmitButton: collaboration.shouldShowSubmitButton,
        collaborationName: collaboration.collaborationName,
        windowSize
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

