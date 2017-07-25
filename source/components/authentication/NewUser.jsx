import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { registerUser }from './../../actions/authenticationActionCreators.js'
import { Link } from 'react-router-dom';
import Form from './../../shared/Form.jsx';
import { Field } from './../../shared/Form.jsx';

export class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
    }

    onSubmit(formValues) {
        if(!this.hasErrors(formValues)) {
            this.props.registerUser(formValues.userName, formValues.email, formValues.password);
        }
    }

    hasErrors(formValues) {
        let errors = {};

        if(isNullOrWhitespace(formValues.userName)) {
            errors.userName = 'User Name is required.';
        }

        if(isNullOrWhitespace(formValues.email)) {
            errors.email = 'Email is required.';
        }

        if(isNullOrWhitespace(formValues.emailConfirmation)) {
            errors.emailConfirmation = 'Email (Re-enter) is required.';
        } else if(formValues.email != formValues.emailConfirmation){
            errors.emailConfirmation = 'Email (Re-enter) must match Email.';
        }

        if(isNullOrWhitespace(formValues.password)) {
            errors.password = 'Password is required.';
        } else if(formValues.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';            
        }

        if(isNullOrWhitespace(formValues.passwordConfirmation)) {
            errors.passwordConfirmation = 'Password (Re-enter) is required.';
        } else if(formValues.password != formValues.passwordConfirmation){
            errors.passwordConfirmation = 'Password (Re-enter) must match Password.';
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
        return (
            <main>
                <h1>Enroll as a New Stirytime User</h1>
                {this.state.errors.signinError && <label className="error">{this.state.errors.signinError}</label>}
                <Form onSubmit={this.onSubmit}>
                    <Field type="text"
                        name="userName"
                        label="User Name"
                        error={this.state.errors.userName}
                        maxLength="20"
                    />
                    <Field type="email"
                        name="email"
                        label="Email"
                        error={this.state.errors.email}
                        maxLength="40"
                    />
                    <Field type="email"
                        name="emailConfirmation"
                        label="Email (Re-enter)"
                        error={this.state.errors.emailConfirmation}
                        maxLength="40"
                    />
                    <Field type="password"
                        name="password"
                        label="Password"
                        error={this.state.errors.password}
                        maxLength="40"
                    />
                    <Field type="password"
                        name="passwordConfirmation"
                        label="Password (Re-enter)"
                        error={this.state.errors.passwordConfirmation}
                        maxLength="40"
                    />
                    <div className="button-container">
                        <button type="submit" className="primary">Submit</button>
                    </div>
                </Form>
            </main>
        )
    }
}

const mapStateToProps = ({authentication}) => {
    return {
        signinError: authentication.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (userName, email, password) => 
            dispatch(registerUser(userName, email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);

