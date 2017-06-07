import React from 'react';
import { connect } from 'react-redux';
import { gotoPreviousQuestion, gotoNextQuestion, submitQuestionnaire } from './../actions/actionCreators.js';
import Question from './Question.jsx';
import StepIndicator from './StepIndicator.jsx';

export const ScrambledPresentation = ({status, answers, collaborationName}) => (
    <div className="questionnaire-container">
        <h1>The Stiry (Scrambled) Result</h1>
        <h2>Session Name: {collaborationName}</h2>
        <p>Status: {status}</p>
        {
            answers && answers.length && answers.map( a => {
                return (
                    <div>
                        <div>{a.prompt}</div>
                        <div>{a.text}</div>
                    </div>
                )
            })
        }
    </div>
);

const mapStateToProps = (state) => {
    let scrambled = state.scrambled || {};
    return {
        status:     scrambled.status,
        answers:    scrambled.answers,
        collaborationName: 'TODO'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

const Scrambled = connect(mapStateToProps, mapDispatchToProps)(ScrambledPresentation);

export default Scrambled;

