import React from 'react';
import { connect } from 'react-redux';
import { getCollaborationStatus, getScrambledResult} from './../../actions/collaborationActionCreators.js';

class Wait extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        return;
        console.log('starting timer');
        this.timer = setInterval(() => {
            if(this.props.isScrambled && this.props.incompleteSurveyCount == 0) {
                console.log('scramble complete');
                if(this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.props.onGetScrambled();
                }
            } else {
                this.props.onCheckStatus()
            }
        }, 2000);
    }

    componentWillUnmount() {
        return;
        console.log('stopping timer');
        if(this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    render() {
        var s = this.props.scrambled && JSON.stringify(this.props.scrambled);
        return (
            <div>
                <h1>Waiting For Result</h1>
                {this.props.incompleteSurveyCount}
                <div className="button-container">
                    <button type="button" className="primary" onClick={this.props.onCheckStatus}>Check Status</button>
                </div>
                <div className="button-container">
                    <button type="button" className="primary" onClick={this.props.onGetScrambled}>Get Scrambled</button>
                </div>
                { s && <div>{s}</div>}
            </div>
        )
    }
}

const mapStateToProps = ({collaboration}) => {
    return {
        incompleteSurveyCount: collaboration.incompleteSurveyCount,
        isScrambled: collaboration.isScrambled,
        scrambled: collaboration.answers
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckStatus: () => dispatch(getCollaborationStatus()),
        onGetScrambled: () => dispatch(getScrambledResult())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait);

