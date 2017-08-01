import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { resetPassword } from './../../actions/authenticationActionCreators.js'
import { Link } from 'react-router-dom';
import Form from './../../shared/input/Form.jsx';
import Field  from './../../shared/input/Form.jsx';
import PrimaryButton from './../../shared/input/PrimaryButton.jsx';

export class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        let resetToken = '';
        if(props.location && props.location.search && props.location.search.length > 1) {
            // Note: Token should be in querystring (?tokenHere);
            resetToken = props.location.search.substr(1); 
        }

        this.state = {
            resetToken: resetToken,
            password: '',
            passwordConfirmation: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value, errors: {} });
    }

    onSubmit(event) {
        event.preventDefault();

        if (!this.hasErrors()) {
            this.props.resetPassword(this.state.resetToken, this.state.password);
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.signinError != this.state.errors.signinError) {
            this.setState({ errors: { signinError: nextProps.signinError }});
        }
    }

    render() {
        // TODO: On Right Side of form, give password tips
        return (
            <main>
                <h1>Change Password</h1>
                <Form onSubmit={this.onSubmit}>
                    <Field type="password"
                        name="password"
                        label="New Password"
                        error={this.state.errors.password}
                    />
                    <Field type="password"
                        name="newPpassword"
                        label="New Password"
                        error={this.state.errors.password}
                    />
                    <Field type="password"
                        name="passwordConfirmation"
                        label="New Password (Re-enter)"
                        error={this.state.errors.passwordConfirmation}
                    />
                    <div className="button-container">
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </Form>
            </main>
        )
    }
}


const mapStateToProps = ({authentication}) => {
    return {
        signinError: authentication.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (resetToken, password) => 
            dispatch(resetPassword(resetToken, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

