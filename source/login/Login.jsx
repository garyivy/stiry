import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { post } from './../shared/api.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
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

        if(!this.hasErrors()) {
    
            post('authenticate', { userName: this.state.userName, password: this.state.password })
                .then( (result) => {
                    if(result && result.sessionToken) {
                        let loggedInPath = '/';
                        if(this.props && this.props.location && this.props.location.state && this.props.location.state.from &&this.props.location.state.from.pathname) {
                            loggedInPath = this.props.location.state.from.pathname;
                        }
                        this.props.dispatch({ type: 'SHOW_PRIVATE_LINKS', userName: this.state.userName });
                        this.props.history.push(loggedInPath);                        
                    } else {
                        this.setState( { errors: { password: 'Invalid User Name or Password' } });
                    }
                })
        }
    }

    hasErrors() {
        let errors = {};

        if(isNullOrWhitespace(this.state.userName)) {
            errors.userName = 'User Name (or Email) is required.';
        }

        if(isNullOrWhitespace(this.state.password)) {
            errors.password = 'Password is required.';
        } 

        this.setState({ errors: errors });

        return Object.keys(errors).length > 0;
    }

    render() {
        // TODO: How/if React is efficiently handling expression like this.state.errors.password && <... (some sort of JSX trick, or catch wrapper)
        return (
            <div>
                <h1>Stiry Login</h1>
                <p>
                    If you are a new user, <Link to="/newuser">click here to add your credentials.</Link>
                    <br/>If you forgot your password , <Link to="/newpassword">click here to have a temporary password emailed to you.</Link>
                </p>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>User Name (or Email)</label>
                        <input name="userName" value={this.state.userName} onChange={this.onChange} maxLength="20"/>
                        {this.state.errors.userName && <label className="error">{this.state.errors.userName}</label>}
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password"  value={this.state.password} onChange={this.onChange} maxLength="40"/>
                        {this.state.errors.password && <label className="error">{this.state.errors.password}</label>}
                    </div>
                    <div className="button-container">
                        <button type="submit" className="primary">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const ConnectedLogin = connect()(Login); // This ensures the dispatch comes as a prop.

export default ConnectedLogin;
