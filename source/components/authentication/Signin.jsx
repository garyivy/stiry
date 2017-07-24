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
            <div>
                <main>
                    <h1>Stiry Sign In</h1>
                    <form onSubmit={this.onSubmit} className="form">
                        <div className="field">
                            <label>User Name (or Email)</label>
                            <input name="userName" value={this.state.userName} onChange={this.onChange} maxLength="40" placeholder="User Name or Email" />
                            {this.state.errors.userName && <label className="error">{this.state.errors.userName}</label>}
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange} maxLength="60" placeholder="Password" />
                            {this.state.errors.password && <label className="error">{this.state.errors.password}</label>}
                            {this.state.errors.signinError && <label className="error">{this.state.errors.signinError}</label>}
                        </div>
                        <div className="button-container">
                            <PrimaryButton>Sign In</PrimaryButton>
                        </div>
                    </form>
                    <h2>Directions</h2>
                    <ul className="responsive-content-regular">
                        <li>If have already registered, enter your User Name or Email, your password, and click "Sign In".</li>
                        <li>If you have not registered (<b>new user</b>), <Link to="/register">click here</Link> to register.</li>
                        <li>If you <b>forgot your password,</b> <Link to="/forgot">click here</Link>.</li>
                    </ul>
                    <ul className="responsive-content-small">
                        <li>Enter User Name (or Email), password, and click "Sign In".</li>
                        <li>New user? <Link to="/register">Sign up here.</Link></li>
                        <li>Forgot password? <Link to="/forgot">Click here.</Link></li>
                    </ul>
                </main>
                <aside>
                    <h1>Stirytime Security</h1>
                    <ul>
                      <li>HTTPS<br/>Transmission</li>
                    </ul>
                    <ul>
                      <li>Trusted<br/>Certificate</li>
                    </ul>
                    <ul>
                      <li>Passwords<br/>saved as<br/>bcrypt hashes.</li>
                    </ul>
                </aside>
            </div>
        )
    }
}

const mapStateToProps = ({ authentication }) => {
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


