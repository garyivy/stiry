import React from 'react';
import { connect } from 'react-redux';

export const Scrambled = ({ answers, collaborationCode }) => (
    <main>
        <h1>The Stirytime (Scrambled) Result</h1>
        <h2>Collaboration Code: {collaborationCode}</h2>
        {
            answers && answers.length && answers.map(a => {
                return (
                    <div key={a.prompt}>
                        <div><b>{a.prompt}</b></div>
                        <div>{a.text}</div>
                        <br />
                    </div>
                )
            })
        }
    </main>
);

const mapStateToProps = ({ collaboration }) => {
    return {
        answers: collaboration.answers,
        collaborationCode: collaboration.collaborationName
    }
}

export default connect(mapStateToProps)(Scrambled);

