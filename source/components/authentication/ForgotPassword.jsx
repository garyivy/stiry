import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from './../../actions/actionCreators.js'

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        if (!this.hasErrors()) {
            this.props.requestPasswordReset(this.state.email);
        }
    }

    hasErrors() {
        let errors = {};

        if (isNullOrWhitespace(this.state.email)) {
            errors.email = 'Email is required.';
        }

        this.setState({ errors: errors });

        return Object.keys(errors).length > 0;
    }

    render() {
        return (
            <div>
                <h1>Forgot Password</h1>
                <p>
                    THIS PAGE IS UNDER CONSTRUCTION
                </p>
                <p>
                    Use this page to have a "password reset" email sent to you.
                    When the email arrives, click on the link.
                </p>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>Email</label>
                        <input name="email" value={this.state.email} onChange={this.onChange} maxLength="40" />
                        {this.state.errors.email && <label className="error">{this.state.errors.email}</label>}
                    </div>
                    {this.props.resetLink && <a href={this.props.resetLink}>Click to choose a new password</a>}
                    <div className="button-container">
                        <button type="submit" className="primary" onClick={this.onSubmit}>Send Request</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        resetLink: state.user.resetLink // TODO: Send email with link instead showing on page :)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestPasswordReset: (email) =>
            dispatch(forgotPassword(email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

