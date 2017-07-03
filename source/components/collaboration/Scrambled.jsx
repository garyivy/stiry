import React from 'react';
import { connect } from 'react-redux';
import { gotoPreviousQuestion, gotoNextQuestion, submitQuestionnaire } from './../../actions/collaborationActionCreators.js';

export const ScrambledPresentation = ({status, answers, collaborationName}) => (
    <div className="questionnaire-container">
        <h1>The Stiry (Scrambled) Result</h1>
        <h2>Collaboration Name: {collaborationName}</h2>
        {
            answers && answers.length && answers.map( a => {
                return (
                    <div key={a.prompt}>
                        <div><b>{a.prompt}</b></div>
                        <div>{a.text}</div>
                        <br/>
                    </div>
                )
            })
        }
    </div>
);

const mapStateToProps = ({collaboration}) => {
    return {
        answers:            collaboration.answers,
        collaborationName:  collaboration.collaborationName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const Scrambled = connect(mapStateToProps, mapDispatchToProps)(ScrambledPresentation);

export default Scrambled;

