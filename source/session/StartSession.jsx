import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StartSessionPresentation = ({ sessionName, onChange, onSubmit, error }) => (
    <div>
        <h1>Start a Stiry Session</h1>
        <p>
            A session name is needed to group participants together.
            One person starts a session here.  The remaining partipants will join the session by
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

class StartSessionContainer extends React.Component {
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

            // TODO: Validate sessionName is available
            this.props.dispatch({ type: 'STARTING_SESSION', sessionName: this.state.sessionName });
            this.props.history.push('/questionnaire');
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

