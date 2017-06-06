import React from 'react';
import { connect } from 'react-redux';
import { recordAnswer } from './../actions/actionCreators.js';

export const QuestionPresentation = ({questionText, initialAnswer, onAnswerChange, error}) => ( 
    <div className="question-container">
        <label htmlFor="txtQuestion">{questionText}</label>
        <textarea onChange={onAnswerChange} value={initialAnswer}></textarea>
        {error && <label htmlFor="txtQuestion">{error}</label>}
    </div>
);

const mapStateToProps = (state) => {
    let questionnaire = state.questionnaire || {};
    return {
        questionText: questionnaire.answers[questionnaire.currentQuestionIndex].prompt,
        initialAnswer: questionnaire.answers[questionnaire.currentQuestionIndex].answer,
        error: questionnaire.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAnswerChange: (event) => dispatch(recordAnswer(event.target.value))
    }
};

const Question = connect(mapStateToProps, mapDispatchToProps)(QuestionPresentation);

export default Question;

