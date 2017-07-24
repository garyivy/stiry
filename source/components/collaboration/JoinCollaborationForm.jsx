import React from 'react';
import { connect } from 'react-redux';
import { joinCollaboration, joinCollaborationAsGuest } from './../../actions/collaborationActionCreators.js';
import PrimaryButton from './../../shared/PrimaryButton.jsx';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { CONDENSED_TEXT_BREAKPOINT } from './../../style/breakpoints.js';

export const JoinCollaborationFormPresentation = ({
    value, onChange, buttonText, buttonTitle, onSubmit, error }) => (
        <form onSubmit={onSubmit} className="single-input-form">
            <label htmlFor="collaborationCode">Collaboration Code</label>
            <input type="number"
                name="collaborationCode"
                title="Six Digit Collaboration Code"
                placeholder="Code"
                value={value}
                onChange={onChange} />
            <PrimaryButton title={buttonTitle}>{buttonText}</PrimaryButton>
            {error && <label className="error" htmlFor={name}>{error}</label>}
        </form>
    );


export class JoinCollaborationFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collaborationCode: '',
            error: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ collaborationCode: event.target.value, error: null });
    }

    onSubmit(event) {
        event.preventDefault();

        if (isNullOrWhitespace(this.state.collaborationCode)) {
            this.setState({ error: 'Collaboration Code is required.' });
        } else if (!this.state.collaborationCode.match(/^\d{6}$/)) {
            this.setState({ error: 'Six digits are required.' });
        } else if (this.props.isGuest) {
            this.props.joinAsGuest(this.state.collaborationCode);
        } else {
            this.props.join(this.state.collaborationCode);
        }
    }

    render() {
        let { isGuest, screenWidth, error } = this.props;
        const buttonText = isGuest && screenWidth > CONDENSED_TEXT_BREAKPOINT
            ? 'Join as Guest'
            : 'Join';
        const buttonTitle = isGuest
            ? 'Join Collaboration as Guest'
            : 'Join Collaboration';

        return (
            <JoinCollaborationFormPresentation
                isGuest={isGuest}
                value={this.state.collaborationCode}
                onChange={this.onChange}
                buttonText={buttonText}
                onSubmit={this.onSubmit}
                error={this.state.error || this.props.error}
            />
        )
    }
}
const mapStateToProps = ({ collaboration, authentication, windowSize }) => {
    return {
        error: collaboration.error,
        isGuest: authentication.isGuest,
        screenWidth: windowSize.width
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // Note: 
        // On success, these redirect to /questionnaire.  
        // On failure, error is set in collaborationReducer.
        join: (collaborationCode) => dispatch(joinCollaboration(collaborationCode)),
        joinAsGuest: (collaborationCode) => dispatch(joinCollaborationAsGuest(collaborationCode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinCollaborationFormContainer);