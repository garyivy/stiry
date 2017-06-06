import React from 'react';
import { connect } from 'react-redux';

export const StepIndicatorPresentation = ({totalSteps, currentQuestionIndex}) => {
    let steps = [];
    for(let i = 0; i < totalSteps; i++){
        
        let className = 'completed';
        if(i === currentQuestionIndex) {
            className = 'active';
        }
        steps.push(
            <a className={className} key={i}>Question {i + 1}</a>
        );
    }
    return <div className="step-indicator">{steps}</div>;
}

const mapStateToProps = (state) => {
    let questionnaire = state.questionnaire || {};
    return {
        totalSteps: questionnaire.answers.length,
        currentQuestionIndex: questionnaire.currentQuestionIndex
    }
}

const StepIndicator = connect(mapStateToProps, undefined)(StepIndicatorPresentation);

export default StepIndicator;
