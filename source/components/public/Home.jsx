import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { joinCollaborationAsGuest } from './../../actions/collaborationActionCreators.js';
import { Link } from 'react-router-dom';
import PrimaryButton from './../../shared/PrimaryButton.jsx';

export const HomePresentation = ({ collaborationCode, onChange, onJoinCollaboration, error, windowSize }) => {
    let placeholderCollaborationCode = 'Collaboration Code';
    if (windowSize.width < 300) {
        placeholderCollaborationCode = 'Code';
    } else if (windowSize.width < 390) {
        placeholderCollaborationCode = '4 Digits';
    } else if (windowSize.width < 420) {
        placeholderCollaborationCode = '4 Digit Code';
    } else if (windowSize.width > 800) {
        placeholderCollaborationCode = '';
    }

    let joinButtonText = 'Join as Guest';
    if (windowSize.width < '385') {
        joinButtonText = 'Join';
    }

    return (
        <div>
            <main>
                <h1>Welcome to Stirytime</h1>
                <h2>What is Stirytime?</h2>
                <p>
                    Stirytime is a little like "Mad Libs".
                    Participants answer questions to complete a story.
                    Then, each participant receives a scrambled story based upon answers given by other participants.
                    Registered users start a "collaboration" and receive a "collaboration code" so that others can join them.
                </p>
                <h2>Do you want to join a collaboration as a guest?</h2>
                <p>
                    Unregistered users can play as guests by getting a four-digit "collaboration code" from a registered user.

                     <form onSubmit={onJoinCollaboration} className="join-prompt">
                        <div className="field">
                            <div>
                                {windowSize.width > 800 && <label htmlFor="collaborationCode">Collaboration Code</label>}
                                <input type="number"
                                    name="collaborationCode"
                                    value={collaborationCode}
                                    onChange={onChange}
                                    placeholder={placeholderCollaborationCode} />
                                <PrimaryButton>{joinButtonText}</PrimaryButton>
                            </div>
                            {error && <label className="error">{error}</label>}
                        </div>
                    </form>
                </p>
                <h2>How do I start a Stirytime collaboration?</h2>
                <p>
                    <ol>
                        <li>Register as new user (if you have not done so).</li>
                        <li>Sign in.</li>
                        <li>From the menu, choose "Start Collaboration"</li>
                        <li>Note the "Collaboration Code" that is generated</li>
                        <li>Ask participants to join by using that code</li>
                    </ol>
                </p>
            </main>
            <aside>
                <h1>Related Links</h1>
                <a href="http://www.madlibs.com/">Mad Libs</a>
                <br />
                <a href="https://www.wordblanks.com/">Word Blanks</a>
                <br />
                <a href="https://www.eduplace.com/tales/">Wacky Web Tales</a>
            </aside>
        </div>
    )
};

export class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collaborationCode: '',
            error: null
        }

        this.onChange = this.onChange.bind(this);
        this.onJoinCollaboration = this.onJoinCollaboration.bind(this);
    }

    onChange(event) {
        this.setState({ collaborationCode: event.target.value, error: null });
    }

    onJoinCollaboration(event) {
        event.preventDefault();

        if (isNullOrWhitespace(this.state.collaborationCode)) {
            this.setState({ error: 'A collaboration code is required.' });
        }

        this.props.onJoinCollaboration(this.state.collaborationCode);
    }

    render() {
        return (
            <HomePresentation
                collaborationCode={this.state.collaborationCode}
                onChange={this.onChange}
                onJoinCollaboration={this.onJoinCollaboration}
                error={this.state.error || this.props.error}
                windowSize={this.props.windowSize} />
        )
    }
}

const mapStateToProps = ({ collaboration, windowSize }) => {
    return {
        error: collaboration.error,
        windowSize
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onJoinCollaboration: (collaborationCode) => dispatch(joinCollaborationAsGuest(collaborationCode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);