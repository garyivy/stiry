import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';

const StartPromptPresentation = ({userName, onClick}) => {
    return (
    <div>
        Hello {userName}
        <button onClick={onClick}>Give me a name</button>
    </div>
    )
}

const mapStateToProps = state => {
    return { 
        userName: state.userName
    }
}

/*
const showNameActionCreator = () => {
    return {
        type: 'SHOW_NAME'
    }
}
*/


const mapDispatchToProps = dispatch => {
    return {
        onClick: () => dispatch({ type: 'SHOW_NAME' })
    }
}

const StartPrompt = connect(mapStateToProps, mapDispatchToProps)(StartPromptPresentation);

export default StartPrompt;

/*
class StartSessionPromptContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            sessionName: null,
            errors: {
                userName: null,
                sessionName: null
            }
        }

        this.onChange = this.onChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onButtonClick(event) {
        event.preventDefault();

       if(!this.isValid()) {
           return;
       }

        // TODO: Show questionnaire startup message, get stiry session ID, etc.
        this.props.history.push('/questionnaire/1');
        this.setState({ isSessionStarting: true });
    }

    isValid() {
        var errors = {};
        if(isNullOrWhitespace(this.state.userName)) {
            errors.userName = 'User Name is required';
        }
        if(isNullOrWhitespace(this.state.sessionName)) {
            errors.sessionName = 'Session Name is required';
            // TODO: Validate the session name is not already taken.
        }
        this.setState({ errors: errors });
        return Object.keys(errors).length === 0;
    }

    render() {
        return (
            <div>
                <div className="field">
                    <label htmlFor="userName">User Name:</label>
                    <input name="userName" onChange={this.onChange}/>
                    {
                        this.state.errors.userName &&
                            <label className="error" htmlFor="userName">{ this.state.errors.userName }</label>     
                    }      
                </div>
                <div className="field">
                    <label htmlFor="sessionName">Session Name:</label>
                    <input name="sessionName" onChange={this.onChange}/>
                    {
                        this.state.errors.sessionName &&
                            <label className="error" htmlFor="sessionName">{ this.state.errors.sessionName }</label>     
                    }      
                </div>
                <button className="primary-button" onClick={this.onButtonClick}>Start Session</button>
                {
                    this.state.isSessionStarting && <span>)</span>
                }
            </div>
        );
    }
}

StartSessionPromptContainer.propTypes = {
}

*/