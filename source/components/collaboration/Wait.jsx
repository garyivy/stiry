import React from 'react';
import { connect } from 'react-redux';
import { getCollaborationStatus, getScrambledResult, forceCollaborationEnd } from './../../actions/collaborationActionCreators.js';
import Form from './../../shared/input/Form.jsx';
import Field from './../../shared/input/Form.jsx';
import PrimaryButton from './../../shared/input/PrimaryButton.jsx';

class Wait extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.shouldShowStatus = false;
        this.shouldAllowForce = false;
        this.statusChecks = 1;

        this.timer = setTimeout(() => {
            this.timer = null;
            this.props.onCheckStatus();
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.shouldShowStatus = true;
        this.statusChecks++;
        this.shouldAllowForce = this.statusChecks > 3;

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        if (this.wasGetScrambledCalled) {
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
        return (
            <div>
                <h1>Waiting For Result</h1>
                {this.shouldShowStatus && <span>Number of surveys still waiting to be completed:&nbsp;{this.props.incompleteSurveyCount}</span>}

                <br />
                <br />
                {
                    this.shouldAllowForce &&
                    <span>
                        <Form onSubmit={this.props.onEndCollaboration}>
                            <PrimaryButton>End Collaboration</PrimaryButton>
                        </Form>
                        <h2>Directions</h2>
                        <ul>
                            <li>Sometimes, a participant may accidentally restart a session.</li>
                            <li>When this happens Stirytime thinks there is an extra user.</li>
                            <li>Or, perhaps a participant lost internet access.</li>
                            <li>Rather than have the whole group of participants miss out on the results, you can click "End Collaboration".</li>
                            <li>At that point, Stirytime will deliver results as best it can.</li>
                        </ul>
                    </span>
                }
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
        onShowScrambled: () => dispatch(getScrambledResult()),
        onEndCollaboration: () => dispatch(forceCollaborationEnd())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait);

