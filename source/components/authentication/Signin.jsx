import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from './../../actions/authenticationActionCreators.js'
import PrimaryButton from './../../shared/PrimaryButton.jsx';

export class Signin extends React.Component {
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
        this.setState({ [event.target.name]: event.target.value, errors: {} });
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.hasErrors()) {
            return;
        }

        let loggedInPath = '/';
        if (this.props 
            && this.props.location 
            && this.props.location.state 
            && this.props.location.state.from 
            && this.props.location.state.from.pathname) {
            loggedInPath = this.props.location.state.from.pathname;
        }

        this.props.signin(this.state.userName, this.state.password, loggedInPath);
    }

    hasErrors() {
        let errors = {};

        if (isNullOrWhitespace(this.state.userName)) {
            errors.userName = 'User Name (or Email) is required.';
        }

        if (isNullOrWhitespace(this.state.password)) {
            errors.password = 'Password is required.';
        }

        this.setState({ errors: errors });

        return Object.keys(errors).length > 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signinError != this.state.errors.signinError) {
            this.setState({ errors: { signinError: nextProps.signinError } });
        }
    }

    render() {
        return (
            <main>
                <h1>Stiry Sign In</h1>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>User Name (or Email)</label>
                        <input name="userName" value={this.state.userName} onChange={this.onChange} maxLength="20" />
                        {this.state.errors.userName && <label className="error">{this.state.errors.userName}</label>}
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.onChange} maxLength="40" />
                        {this.state.errors.password && <label className="error">{this.state.errors.password}</label>}
                        {this.state.errors.signinError && <label className="error">{this.state.errors.signinError}</label>}
                    </div>
                    <div className="button-container">
                        <PrimaryButton>Login</PrimaryButton>
                    </div>
                </form>
                <p className="responsive-content-regular">
                    If you are a new user, <Link to="/register">click here</Link> to add your credentials.
                    <br />If you forgot your password , <Link to="/forgot">click here</Link> to have a temporary password emailed to you.
                </p>                
                <p className="responsive-content-condensed">
                    New user? <Link to="/register">Sign up here.</Link>
                    <br/>Forgot password? <Link to="/forgot">Click here.</Link>
                </p>                
            </main>
        )
    }
}

const mapStateToProps = ({authentication}) => {
    console.log('Signin mapStateToProps called'); // TODO: Remove
    return {
        signinError: authentication.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (userName, password, redirectUrl) =>
            dispatch(signin(userName, password, redirectUrl))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);


