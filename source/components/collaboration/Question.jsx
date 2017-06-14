import React from 'react';
import { connect } from 'react-redux';
import { recordAnswer } from './../../actions/collaborationActionCreators.js';

export const QuestionPresentation = ({questionText, initialAnswer, onAnswerChange, error}) => ( 
    <div className="question-container">
        <label htmlFor="txtQuestion">{questionText}</label>
        <textarea onChange={onAnswerChange} value={initialAnswer}></textarea>
        {error && <label htmlFor="txtQuestion">{error}</label>}
    </div>
);

const mapStateToProps = ({collaboration}) => {
    let { answers, currentQuestionIndex, error } = collaboration;
    return {
        questionText:   answers[currentQuestionIndex].prompt,
        initialAnswer:  answers[currentQuestionIndex].text,
        error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAnswerChange: (event) => dispatch(recordAnswer(event.target.value))
    }
};

const Question = connect(mapStateToProps, mapDispatchToProps)(QuestionPresentation);

export default Question;

