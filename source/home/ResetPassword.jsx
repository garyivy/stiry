import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NewPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            currentPassword: '',
            password: '',
            passwordConfirmation: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        this.hasErrors();
        
        let loggedInPath = '/';
        if(this.props && this.props.location && this.props.location.state && this.props.location.state.from &&this.props.location.state.from.pathname) {
            loggedInPath = this.props.location.state.from.pathname;
        }
    }

    hasErrors() {
        let errors = {};

        if(isNullOrWhitespace(this.state.currentPassword)) {
            errors.currentPassword = 'Current Password is required.';
        }

        if(isNullOrWhitespace(this.state.password)) {
            errors.password = 'New Password is required.';
        } else if(this.state.password.length < 6) {
            errors.password = 'New Password must be at least 6 characters long.';            
        }

        if(isNullOrWhitespace(this.state.passwordConfirmation)) {
            errors.passwordConfirmation = 'New Password (Re-enter) is required.';
        } else if(this.state.password != this.state.passwordConfirmation){
            errors.passwordConfirmation = 'New Password (Re-enter) must match Password.';
        }

        this.setState({ errors: errors });

        return Object.keys(errors).length > 0;
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
                        <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.onChange} maxLength="40"/>
                        {this.state.errors.currentPassword && <label className="error">{this.state.errors.currentPassword}</label>}
                    </div>
                    <div className="field">
                        <label>New Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} maxLength="40"/>
                        {this.state.errors.password && <label className="error">{this.state.errors.password}</label>}
                    </div>
                    <div className="field">
                        <label>New Password (Re-enter)</label>
                        <input type="password" name="passwordConfirmation"  value={this.state.passwordConfirmation} onChange={this.onChange} maxLength="40"/>
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
