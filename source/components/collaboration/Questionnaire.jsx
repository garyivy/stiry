import React from 'react';
import { connect } from 'react-redux';
import { gotoPreviousQuestion, gotoNextQuestion, submitQuestionnaire } from './../../actions/actionCreators.js';
import Question from './Question.jsx';
import { QuestionPresentation } from './Question.jsx';
import StepIndicator from './StepIndicator.jsx';

export const QuestionnairePresentation = ({
    shouldShowPreviousButton,   onPreviousButtonClick, 
    shouldShowNextButton,       onNextButtonClick, 
    shouldShowSubmitButton,     onSubmitButtonClick, 
    collaborationName,          collaborationToken}) => (
    <div className="questionnaire-container">
        <h1>The Stiry Questionnaire</h1>
        <h2>Session Name: {collaborationName}</h2>
        <StepIndicator/>
        <Question/>
        <div className="button-container">
            {shouldShowPreviousButton   && <button onClick={onPreviousButtonClick}>Previous Question</button>}
            {shouldShowNextButton       && <button className="primary" onClick={onNextButtonClick}>Next Question</button>}
            {shouldShowSubmitButton     && <button className="primary" onClick={onSubmitButtonClick}>Submit</button>}
        </div>
    </div>
);

const mapStateToProps = (state) => {
    let { shouldShowPreviousButton, 
        shouldShowNextButton, 
        shouldShowSubmitButton, 
        collaborationName 
    } = state.collaboration;    

    // TODO: Note why ...state.collaboration would be inefficient here (shallow compare would result in unnecessary renders).
    return { 
        shouldShowPreviousButton, 
        shouldShowNextButton, 
        shouldShowSubmitButton, 
        collaborationName 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPreviousButtonClick:  () => dispatch(gotoPreviousQuestion()),
        onNextButtonClick:      () => dispatch(gotoNextQuestion()),
        onSubmitButtonClick:    () => dispatch(submitQuestionnaire())
    }
}

const Questionnaire = connect(mapStateToProps, mapDispatchToProps)(QuestionnairePresentation);

export default Questionnaire;

