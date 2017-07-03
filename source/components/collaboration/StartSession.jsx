import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { startCollaboration } from './../../actions/collaborationActionCreators.js';
import { Link } from 'react-router-dom';
import PrimaryButton from './../../shared/PrimaryButton.jsx';

// TODO: Refactor using css/component
const inputStyle = { display: 'inline-block' };
const buttonDivStyle = { paddingTop: '2px', marginLeft: '8px', display: 'inline-block' };
const buttonStyle = { marginTop: '0' };

export const StartSessionPresentation = ({ collaborationName, onChange, onSubmit, error }) => (
    <div>
        <h1>Start a Stiry Collaboration</h1>
        <p>
            A collaboration name is needed to group participants together.
            One person starts a collaboration here.  The remaining partipants will need this name to join the collaboration by
            &nbsp;<Link to="/joinsession">clicking here</Link> or choosing "Join&nbsp;Collaboration" from the site menu.
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

export class StartSessionContainer extends React.Component {
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
            this.setState({ error: 'Collaboration Namename is required.' });
        } else {
            this.setState({ error: null });
            this.props.startCollaboration(this.state.collaborationName);
        }
    }

    render() {
        return (
            <StartSessionPresentation
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
        startCollaboration: (collaborationName) =>
            dispatch(startCollaboration(collaborationName))
    }
}

const StartSession = connect(mapStateToProps, mapDispatchToProps)(StartSessionContainer);

export default StartSession;

