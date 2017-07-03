import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { joinCollaboration } from './../../actions/collaborationActionCreators.js';
import { Link } from 'react-router-dom';
import PrimaryButton from './../../shared/PrimaryButton.jsx';

// TODO: Refactor using css/component
const inputStyle = { display: 'inline-block' };
const buttonDivStyle = { paddingTop: '2px', marginLeft: '8px', display: 'inline-block' };
const buttonStyle = { marginTop: '0' };

export const JoinSessionPresentation = ({ collaborationName, onChange, onSubmit, error }) => (
    <div>
        <h1>Join a Stiry Collaboration</h1>
        <p>If you are interested in joining a "Collaboration" that someone else in your group has already started, 
            enter the session name they provided.
            If you are interested in starting one for others to join,
            &nbsp;<Link to="/startsession">click here</Link> or choose "Start&nbsp;Session" from the site menu.
        </p>
        <form onSubmit={onSubmit}>
            <div className="field">
                <label>Collaboration Name</label>
                <div>
                    <input type="text" name="collaborationName" style={inputStyle} value={collaborationName} onChange={onChange} />
                    <div style={buttonDivStyle}>
                        <PrimaryButton style={buttonStyle}>Submit</PrimaryButton>
                    </div>
                </div>
                {error && <label className="error">{error}</label>}
            </div>
        </form>
    </div>
);

export class JoinSessionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collaborationName: '',
            error: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ collaborationName: event.target.value, error: null });
    }

    onSubmit(event) {
        event.preventDefault();
        
        if (isNullOrWhitespace(this.state.collaborationName)) {
            this.setState({ error: 'Collaboration Name is required.' });
        } else {
            this.setState({ error: null });
            this.props.joinCollaboration(this.state.collaborationName);
        }
    }

    render() {
        return (
            <JoinSessionPresentation
                collaborationName={this.state.collaborationName}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                error={this.state.error} />
        );
    }
}

const mapStateToProps = ({ collaboration }) => {
    return {
        error: collaboration.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        joinCollaboration: (collaborationName) =>
            dispatch(joinCollaboration(collaborationName))
    }
}

const JoinSession = connect(mapStateToProps, mapDispatchToProps)(JoinSessionContainer);

export default JoinSession;

