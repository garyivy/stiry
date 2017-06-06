import React from 'react';
import { connect } from 'react-redux';

const StepIndicator = ({totalSteps, currentQuestionIndex}) => {
    console.log('Rendering StepIndicator');
    let steps = [];
    for(let i = 0; i < totalSteps; i++){
        
        let className = 'completed';
        if(i === currentQuestionIndex) {
            className = 'active';
        }
        steps.push(
            <a className={className}>Question {i + 1}</a>
        );
    }
    return <div className="step-indicator">{steps}</div>;
}

const mapStateToProps = (state) => {
    let questionnaire = state.questionnaire || {};
    return {
        totalSteps: questionnaire.questions.length,
        currentQuestionIndex: questionnaire.currentQuestionIndex
    }
}

const ConnectedStepIndicator = connect(mapStateToProps, undefined)(StepIndicator);

export default ConnectedStepIndicator;
