import React from 'react';
import { connect } from 'react-redux';
import { TOUCH_INPUT_BREAKPOINT, MENU_SHORTEN_NAMES_BREAKPOINT } from './../../style/breakpoints.js';

export const StepIndicatorPresentation = ({totalSteps, currentQuestionIndex, width}) => {
    if(width < TOUCH_INPUT_BREAKPOINT) {
        return null;
    }

    let steps = [];
    for(let i = 0; i < totalSteps; i++){
        
        let className = 'completed';
        if(i === currentQuestionIndex) {
            className = 'active';
        }

        if(width < MENU_SHORTEN_NAMES_BREAKPOINT) {
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
