import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { startedCollaboration } from './../actions/actionCreators.js';
import { Link } from 'react-router-dom';
import { post } from './../shared/api.js';

export const StartSessionPresentation = ({ sessionName, onChange, onSubmit, error }) => (
    <div>
        <h1>Start a Stiry Session</h1>
        <p>
            A session (collaboration) name is needed to group participants together.
            One person starts a session here.  The remaining partipants will need this name to join the session by
            &nbsp;<Link to="/joinsession">clicking here</Link> or choosing "Join Session" from the site menu.
        </p>
        <div className="field">
            <label>Session Name</label>
            <input type="text" name="sessionName" value={sessionName} onChange={onChange} />
            {error && <label className="error">{error}</label>}
        </div>
        <div className="button-container">
            <button className="primary" onClick={onSubmit}>Submit</button>
        </div>
    </div>
);

export class StartSessionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sessionName: '',
            error: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ sessionName: event.target.value });
    }

    onSubmit() {
        if(isNullOrWhitespace(this.state.sessionName)) {
            this.setState({ error: 'Session name is required.' });
        } else {
            this.setState({ error: null });
            post('start', { collaborationName: this.state.sessionName }).then(( result ) => {
                if(result && result.collaborationToken) {
                    this.props.dispatch(startedCollaboration(this.state.sessionName, result.collaborationToken));
                    this.props.history.push('/questionnaire');                    
                } else {
                    // TODO: What should we tell user?
                    console.log(result);
                }
            });
        }
    }
    render() {
        return (
            <StartSessionPresentation 
                sessionName={this.state.sessionName} 
                onChange={this.onChange} 
                onSubmit={this.onSubmit}
                error={this.state.error} />
        );
    }
}

const StartSession = connect()(StartSessionContainer); // Connect so dispatch is added to properties

export default StartSession;

