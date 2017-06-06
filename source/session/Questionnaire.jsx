import React from 'react';
import { connect } from 'react-redux';
import { gotoPreviousQuestion, gotoNextQuestion, submitQuestionnaire } from './../actions/actionCreators.js';
import Question from './Question.jsx';
import StepIndicator from './StepIndicator.jsx';

const QuestionnairePresentation = ({
    shouldShowPreviousButton,   onPreviousButtonClick, 
    shouldShowNextButton,       onNextButtonClick, 
    shouldShowSubmitButton,     onSubmitButtonClick, 
    collaborationName,          collaborationToken}) => { 
    console.log('Rendering Questionnaire');
    return (
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
}
const mapStateToProps = (state) => {
    let questionnaire = state.questionnaire || {};
    return {
        shouldShowPreviousButton: questionnaire.currentQuestionIndex > 0,
        shouldShowNextButton: questionnaire.
        currentQuestionIndex < questionnaire.questions.length - 1,
        shouldShowSubmitButton: questionnaire.currentQuestionIndex == questionnaire.questions.length - 1,
        collaborationName: questionnaire.collaborationName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPreviousButtonClick:  (event) => dispatch(gotoPreviousQuestion()),
        onNextButtonClick:      (event) => dispatch(gotoNextQuestion()),
        onSubmitButtonClick:    (event) => dispatch(submitQuestionnaire())
    }
}

class QuestionnaireContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <QuestionnairePresentation {...this.props}  />
        );
    }
}

const Questionnaire = connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);

export default Questionnaire;

