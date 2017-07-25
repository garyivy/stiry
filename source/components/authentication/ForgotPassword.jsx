import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from './../../actions/authenticationActionCreators.js'
import { Form, Field } from './../../shared/Form.jsx';
import PrimaryButton from './../../shared/PrimaryButton.jsx';

const style = { width: "100%", maximumWidth: "400px" };

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            shouldShowMessage: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
    }

    onSubmit(formValues) {
        event.preventDefault();

        if (!this.hasErrors(formValues)) {
            this.props.requestPasswordReset(formValues.email);
            this.setState({ shouldShowMessage: true, errors: {} });
        }
    }

    hasErrors(formValues) {
        let errors = {};

        if (isNullOrWhitespace(formValues.email)) {
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
                    <Form onSubmit={this.onSubmit}>
                        <Field type="email"
                            name="email"
                            label="Email"
                            maxLength="40"
                            error={this.state.errors.email}
                            style={style}
                            />
                        <PrimaryButton style={style}>Request Password Reset</PrimaryButton>
                    </Form>
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

const mapDispatchToProps = (dispatch) => {
    return {
        requestPasswordReset: (email) =>
            dispatch(forgotPassword(email))
    }
};

export default connect(null, mapDispatchToProps)(ForgotPassword);

