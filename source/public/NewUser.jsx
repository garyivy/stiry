import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { registerUser }from './../actions/actionCreators.js'
import { Link } from 'react-router-dom';

export class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            emailConfirmation: '',
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

        if(!this.hasErrors()) {
            this.props.registerUser(this.state.userName, this.state.email, this.state.password);
        }
    }

    hasErrors() {
        let errors = {};

        if(isNullOrWhitespace(this.state.userName)) {
            errors.userName = 'User Name is required.';
        }

        if(isNullOrWhitespace(this.state.email)) {
            errors.email = 'Email is required.';
        }

        if(isNullOrWhitespace(this.state.emailConfirmation)) {
            errors.emailConfirmation = 'Email (Re-enter) is required.';
        } else if(this.state.email != this.state.emailConfirmation){
            errors.emailConfirmation = 'Email (Re-enter) must match Email.';
        }

        if(isNullOrWhitespace(this.state.password)) {
            errors.password = 'Password is required.';
        } else if(this.state.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';            
        }

        if(isNullOrWhitespace(this.state.passwordConfirmation)) {
            errors.passwordConfirmation = 'Password (Re-enter) is required.';
        } else if(this.state.password != this.state.passwordConfirmation){
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
            <div>
                <h1>Enroll as a New Stiry User</h1>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>User Name</label>
                        <input name="userName" value={this.state.userName} onChange={this.onChange} maxLength="20"/>
                        {this.state.errors.userName && <label className="error">{this.state.errors.userName}</label>}
                        {this.state.errors.signinError && <label className="error">{this.state.errors.signinError}</label>}
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input name="email" value={this.state.email} onChange={this.onChange} maxLength="40" />
                        {this.state.errors.email && <label className="error">{this.state.errors.email}</label>}
                    </div>
                    <div className="field">
                        <label>Email (Re-enter)</label>
                        <input name="emailConfirmation" value={this.state.emailConfirmation} onChange={this.onChange} maxLength="40"/>
                        {this.state.errors.emailConfirmation && <label className="error">{this.state.errors.emailConfirmation}</label>}
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} maxLength="40"/>
                        {this.state.errors.password && <label className="error">{this.state.errors.password}</label>}
                    </div>
                    <div className="field">
                        <label>Password (Re-enter)</label>
                        <input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.onChange} maxLength="40"/>
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

const mapStateToProps = (state) => {
    return {
        signinError: state.user.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (userName, email, password) => 
            dispatch(registerUser(userName, email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);

