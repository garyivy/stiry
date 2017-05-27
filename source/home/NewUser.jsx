import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { post } from './../shared/api.js';

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '1',
            emailConfirmation: '1',
            password: '123456',
            passwordConfirmation: '123456',
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

        if(this.hasErrors()) {
            return ;
        }

        const newUser = { 
            userName: this.state.userName, 
            email: this.state.email,
            password: this.state.password 
        }
        
        post('users', newUser)
            .then(() => {
                let loggedInPath = '/';
                if(this.props && this.props.location && this.props.location.state 
                    && this.props.location.state.from && this.props.location.state.from.pathname) {
                    loggedInPath = this.props.location.state.from.pathname;
                }
                this.props.dispatch({ type: 'SHOW_PRIVATE_LINKS', userName: this.state.userName });
                this.props.history.push(loggedInPath);                
            });
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
        } else if(this.state.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';            
        }

        if(isNullOrWhitespace(this.state.passwordConfirmation)) {
            errors.passwordConfirmation = 'Password (Re-enter) is required.';
        } else if(this.state.password != this.state.passwordConfirmation){
            errors.passwordConfirmation = 'Password (Re-enter) must match Password.';
        }

        this.setState({ errors: errors });

        return Object.keys(errors).length > 0;
    }

    render() {
        return (
            <div>
                <h1>Enroll as a New Stiry User</h1>
                <p>
                    THIS PAGE IS UNDER CONSTRUCTION
                </p>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>User Name</label>
                        <input name="userName" value={this.state.userName} onChange={this.onChange} maxLength="20"/>
                        {this.state.errors.userName && <label className="error">{this.state.errors.userName}</label>}
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

const ConnectedNewUser = connect()(NewUser); // Note: connect provide dispatch as prop.

export default ConnectedNewUser;