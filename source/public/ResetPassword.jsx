import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { post } from './../shared/api.js';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resetToken: props.location.search.substr(1), // TODO: Redirect if no querystring given?
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

        if (!this.hasErrors()) {
            post('reset', {
                resetToken: this.state.resetToken,
                password: this.state.password
            }).then(result => {
                if (result && result.sessionToken) {
                    localStorage.setItem('sessionToken', result.sessionToken);
                    this.props.dispatch({ type: 'SIGNIN_COMPLETE', userDisplayName: result.userDisplayName });
                    this.props.history.push('/');
                }
            });
        }
    }

    hasErrors() {
        let errors = {};

        if (isNullOrWhitespace(this.state.password)) {
            errors.password = 'New Password is required.';
        } else if (this.state.password.length < 8) {
            errors.password = 'New Password must be at least 8 characters long.';
        }

        if (isNullOrWhitespace(this.state.passwordConfirmation)) {
            errors.passwordConfirmation = 'New Password (Re-enter) is required.';
        } else if (this.state.password != this.state.passwordConfirmation) {
            errors.passwordConfirmation = 'New Password (Re-enter) must match Password.';
        }

        this.setState({ errors: errors });

        return Object.keys(errors).length > 0;
    }

    render() {
        // TODO: On Right Side of form, give password tips
        return (
            <div>
                <h1>Change Password</h1>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>New Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} maxLength="40" />
                        {this.state.errors.password && <label className="error">{this.state.errors.password}</label>}
                    </div>
                    <div className="field">
                        <label>New Password (Re-enter)</label>
                        <input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.onChange} maxLength="40" />
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

export default connect()(ResetPassword);

