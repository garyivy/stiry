import React from 'react';
import { connect } from 'react-redux';
import { requestCollaborationStatus } from './../actions/actionCreators.js';

class Wait extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h1>Waiting For Result</h1>
                <div className="button-container">
                    <button type="button" className="primary" onClick={this.props.onCheckStatus}>Check Status</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let questionnaire = state.questionnaire;
    return {
        status:     questionnaire.status
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
       onCheckStatus: () => dispatch(requestCollaborationStatus())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wait);

