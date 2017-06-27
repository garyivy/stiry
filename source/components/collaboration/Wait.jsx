import React from 'react';
import { connect } from 'react-redux';
import { getCollaborationStatus, getScrambledResult } from './../../actions/collaborationActionCreators.js';

class Wait extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.timer = setTimeout(() => {
            this.timer = null;
            this.props.onCheckStatus();
        }, 2000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        
        if(this.wasGetScrambledCalled) {
            // Sanity check, redirect should prevent this from being needed
            return;
        }
        
        if (nextProps.incompleteSurveyCount > 0) {
            this.timer = setTimeout(() => {
                this.timer = null;
                this.props.onCheckStatus();
            }, 2000);
        } else {
            this.wasGetScrambledCalled = true;
            this.props.onShowScrambled();
        }
    }

    render() {
        var h1 = this.props.isScrambled && this.props.scrambled
            ? <h1>The Result</h1>
            : <h1>Waiting For Result</h1>;

        var result = null;
        if(this.props.isScrambled && this.props.scrambled) {
            result = this.props.scrambled.map(s => 
            <tr>
                <td>{s.prompt}</td>
                <td>{s.text}</td>
            </tr>)
        }

        return (
            <div>
                <h1>Waiting For Result</h1>
                <span>Number of surveys still waiting to be completed:&nbsp;{this.props.incompleteSurveyCount}</span>
            </div>
        )
    }
}

const mapStateToProps = ({ collaboration }) => {
    return {
        incompleteSurveyCount: collaboration.incompleteSurveyCount,
        userStatuses: collaboration.userStatuses,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckStatus: () => dispatch(getCollaborationStatus()),
        onShowScrambled: () => dispatch(getScrambledResult())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait);

