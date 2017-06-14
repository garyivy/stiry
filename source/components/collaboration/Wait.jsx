import React from 'react';
import { connect } from 'react-redux';
import { getCollaborationStatus } from './../../actions/actionCreators.js';

class Wait extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('starting timer');
        this.timer = setInterval(() => {
            if(this.props.isScrambled && this.props.incompleteSurveyCount == 0) {
                console.log('scramble complete');
                if(this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            } else {
                this.props.onCheckStatus()
            }
        }, 2000);
    }

    componentWillUnmount() {
        console.log('stopping timer');
        if(this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    render() {
        return (
            <div>
                <h1>Waiting For Result</h1>
                {this.props.incompleteSurveyCount}
                <div className="button-container">
                    <button type="button" className="primary" onClick={this.props.onCheckStatus}>Check Status</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let collaboration = state.collaboration;
    return {
        incompleteSurveyCount: collaboration.incompleteSurveyCount,
        isScrambled: collaboration.isScrambled
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckStatus: () => dispatch(getCollaborationStatus())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait);

