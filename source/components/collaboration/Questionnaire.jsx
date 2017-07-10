import React from 'react';
import { connect } from 'react-redux';

import Question from './Question.jsx';
import StepIndicator from './StepIndicator.jsx';
import PrimaryButton from './../../shared/PrimaryButton.jsx';

import {
    autoPickAnswer,
    gotoPreviousQuestion,
    gotoNextQuestion,
    submitQuestionnaire
} from './../../actions/collaborationActionCreators.js';

const reducedTextThreshold = 450;

export const QuestionnairePresentation = ({ windowSize, onLazyButtonClick,
    collaborationName, shouldShowPreviousButton, onPreviousButtonClick,
    shouldShowSubmitButton, onNextButtonClick, onSubmitButtonClick }) => {

    let lazyQuestionButtonText = windowSize.width < reducedTextThreshold
        ? 'Lazy'
        : 'I am Lazy';

    let previousQuestionButtonText = windowSize.width < reducedTextThreshold
        ? 'Previous'
        : 'Previous Question';

    let nextQuestionButtonText = windowSize.width < reducedTextThreshold
        ? 'Next'
        : 'Next Question';

    const lazyButton = <button onClick={onLazyButtonClick}>{lazyQuestionButtonText}</button>;

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
        buttons.push(lazyButton);

    } else {
        buttons.push(previousButton);
        buttons.push(lazyButton);
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
        onLazyButtonClick: () => dispatch(autoPickAnswer()),
        onPreviousButtonClick: () => dispatch(gotoPreviousQuestion()),
        onNextButtonClick: () => dispatch(gotoNextQuestion()),
        onSubmitButtonClick: () => dispatch(submitQuestionnaire())
    }
}

const Questionnaire = connect(mapStateToProps, mapDispatchToProps)(QuestionnairePresentation);

export default Questionnaire;

