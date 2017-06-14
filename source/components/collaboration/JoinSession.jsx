import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { joinedCollaboration } from './../../actions/actionCreators.js';
import { Link } from 'react-router-dom';

export const JoinSessionPresentation = ({ sessionName, onChange, onSubmit, error }) => (
    <div>
        <h1>Join a Stiry Session</h1>
        <p>
            If you are interested in joining a session (collaboration) that someone else in your group has already started, enter the session name they provided.
            
            If you are interested in starting a session for others to join,
            &nbsp;<Link to="/startsession">click here</Link> or choose "Start Session" from the site menu.
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

export class JoinSessionContainer extends React.Component {
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
            /*
            post('join', { collaborationName: this.state.sessionName }).then(( result ) => {
                if(result && result.collaborationToken) {
                    this.props.dispatch(joinedCollaboration(this.state.sessionName, result.collaborationToken));
                    this.props.history.push('/questionnaire');                    
                } else {
                    // TODO: What should we tell user?
                    console.log(result);
                }
            });
        */
        }
    }
    render() {
        return (
            <JoinSessionPresentation 
                sessionName={this.state.sessionName} 
                onChange={this.onChange} 
                onSubmit={this.onSubmit}
                error={this.state.error} />
        );
    }
}

const JoinSession = connect()(JoinSessionContainer); // Connect so dispatch is added to properties

export default JoinSession;

