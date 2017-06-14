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
    let { answers, currentQuestionIndex } = state.collaboration;
    return {
        totalSteps:             answers.length,
        currentQuestionIndex:   currentQuestionIndex
    }
}

const StepIndicator = connect(mapStateToProps, undefined)(StepIndicatorPresentation);

export default StepIndicator;
