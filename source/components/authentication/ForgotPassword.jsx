import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from './../../actions/authenticationActionCreators.js'

// TODO: Add responsive directions and eliminate inline style.

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {},
            shouldShowMessage: false
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
            this.setState({ shouldShowMessage: true, errors: {} });
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
            <main>
                <h1>Forgot Password</h1>
                {
                    this.state.shouldShowMessage &&
                    <p>
                        An email has been sent to you that contains a "password reset" link.
                    </p>
                }
                {
                    !this.state.shouldShowMessage &&
                    <form onSubmit={this.onSubmit}>
                        <div className="field">
                            <label>Email</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.onChange} maxLength="40" style={{ width:'300px', margin:'10px 0 0 0'}}/>
                            <button type="submit" className="primary" style={{ width:'300px', margin:'10px 0 0 0'}} onClick={this.onSubmit}>Request Password Reset</button>
                            {this.state.errors.email && <label className="error">{this.state.errors.email}</label>}
                        </div>
                    </form>
                }
                <h2>Directions</h2>
                {
                    this.state.shouldShowMessage &&
                    <ol>
                        <li>Check your email for a message from StirytimeWebsite@gmail.com.</li>
                        <li>Click on the link provided in that email to complete the password reset.</li>
                    </ol>
                }
                {
                    !this.state.shouldShowMessage &&
                    <ol>
                        <li>Enter your email address the was used when your registered (Signed-up) with Stirytime.</li>
                        <li>Click "Request Password Reset" to have an email sent to you with further directions.</li>
                    </ol>
                }
            </main>
        )
    }
}

const mapStateToProps = ({ authentication }) => {
    return {
        resetLink: authentication.resetLink // TODO: Send email with link instead showing on page :)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestPasswordReset: (email) =>
            dispatch(forgotPassword(email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

