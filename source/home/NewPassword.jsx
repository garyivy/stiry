import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            password: '',
            passwordConfirmation: '',
            errors: {
                currentPassword: null,
                password: null,
                passwordConfirmation: null,
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        let loggedInPath = '/';
        if(this.props && this.props.location && this.props.location.state && this.props.location.state.from &&this.props.location.state.from.pathname) {
            loggedInPath = this.props.location.state.from.pathname;
        }
   
        setTimeout(() => {
            this.props.dispatch({ type: 'SHOW_PRIVATE_LINKS', userName: this.state.userName });
            this.props.history.push(loggedInPath);
        }, 500);
    }

    render() {
        return (
            <div>
                <h1>Change Password</h1>
                <p>
                    THIS PAGE IS UNDER CONSTRUCTION
                </p>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>Current Password</label>
                        <input type="currentPassword" name="currentPassword" />
                        {this.state.errors.currentPassword && <label className="error">{this.state.errors.currentPassword}</label>}
                    </div>
                    <div className="field">
                        <label>New Password</label>
                        <input type="password" name="password" />
                        {this.state.errors.password && <label className="error">{this.state.errors.password}</label>}
                    </div>
                    <div className="field">
                        <label>New Password (Re-enter)</label>
                        <input type="passwordConfirmation" name="passwordConfirmation" />
                        {this.state.errors.passwordConfirmation && <label className="error">{this.state.errors.passwordConfirmation}</label>}
                    </div>
                    <div className="button-container">
                        <button type="submit" className="primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

const ConnectedNewPassword = connect()(NewPassword); // This ensures the dispatch comes as a prop.

export default ConnectedNewPassword;
