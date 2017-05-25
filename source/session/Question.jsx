import React from 'react';
import { connect } from 'react-redux';

const QuestionPresentation = ({questionText, initialAnswer, onAnswerChange}) => { 
    console.log('Rendering question...' + initialAnswer);
    return ( 
    <div className="question-container">
        <label htmlFor="txtQuestion">{questionText}</label>
        <textarea onChange={onAnswerChange} value={initialAnswer}></textarea>
    </div>
);
}

const mapStateToProps = (state) => {
    return {
        questionText: state.questions[state.currentQuestionIndex].prompt,
        initialAnswer: state.questions[state.currentQuestionIndex].answer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAnswerChange: (event) => dispatch({ type:'RECORD_ANSWER', answer: event.target.value })
    }
}

const Question = connect(mapStateToProps, mapDispatchToProps)(QuestionPresentation);

export default Question;

