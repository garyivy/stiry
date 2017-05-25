import React from 'react';
import { connect } from 'react-redux';
import Question from './Question.jsx';
import StepIndicator from './StepIndicator.jsx';

const QuestionnairePresentation = ({
    shouldShowPreviousButton,   onPreviousButtonClick, 
    shouldShowNextButton,       onNextButtonClick, 
    shouldShowSubmitButton,     onSubmitButtonClick}) => { 
    console.log('Rendering Questionnaire');
    return (
    <div className="questionnaire-container">
        <h1>The Stiry Questionnaire</h1>
        <StepIndicator/>
        <Question/>
        <div className="button-container">
            {shouldShowPreviousButton   && <button onClick={onPreviousButtonClick}>Previous Question</button>}
            {shouldShowNextButton       && <button className="primary" onClick={onNextButtonClick}>Next Question</button>}
            {shouldShowSubmitButton     && <button className="primary" onClick={onSubmitButtonClick}>Submit</button>}
        </div>
    </div>
);
}
const mapStateToProps = (state) => {
    return {
        shouldShowPreviousButton: state.currentQuestionIndex > 0,
        shouldShowNextButton: state.currentQuestionIndex < state.questions.length - 1,
        shouldShowSubmitButton: state.currentQuestionIndex == state.questions.length - 1
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPreviousButtonClick:  (event) => dispatch({ type:'GOTO_PREVIOUS_QUESTION' }),
        onNextButtonClick:      (event) => dispatch({ type:'GOTO_NEXT_QUESTION' }),
        onSubmitButtonClick:    (event) => dispatch({ type:'SUBMIT_ANSWERS' }),
    }
}

const Questionnaire = connect(mapStateToProps, mapDispatchToProps)(QuestionnairePresentation);

export default Questionnaire;

