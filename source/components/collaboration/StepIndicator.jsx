import React from 'react';
import { connect } from 'react-redux';

export const StepIndicatorPresentation = ({totalSteps, currentQuestionIndex, width}) => {
    if(width < 400) {
        return null;
    }

    let steps = [];
    for(let i = 0; i < totalSteps; i++){
        
        let className = 'completed';
        if(i === currentQuestionIndex) {
            className = 'active';
        }

        if(width < 700) {
            steps.push(
                <a className={className} key={i}>{i + 1}</a>
            );

        } else {
            steps.push(
                <a className={className} key={i}>Question {i + 1}</a>
            );

        }
    }
    return <div className="step-indicator">{steps}</div>;
}

const mapStateToProps = (state) => {
    let { answers, currentQuestionIndex } = state.collaboration;
    return {
        totalSteps:             answers.length,
        currentQuestionIndex:   currentQuestionIndex,
        width:                  state.windowSize.width
    }
}

const StepIndicator = connect(mapStateToProps, undefined)(StepIndicatorPresentation);

export default StepIndicator;
