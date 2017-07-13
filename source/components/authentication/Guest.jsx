import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { registerUser }from './../../actions/authenticationActionCreators.js'
import { Link } from 'react-router-dom';

export class Guest extends React.Component {
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
            this.props.registerUser(this.state.userName, this.state.userName + '@' + 'noemail.com', 'guestuser');
        }
    }

    hasErrors() {
        let errors = {};

        if(isNullOrWhitespace(this.state.userName)) {
            errors.userName = 'User Name is required.';
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
                <h1>Signon As A Guest User</h1>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>User Name</label>
                        <input name="userName" value={this.state.userName} onChange={this.onChange} maxLength="20"/>
                        {this.state.errors.userName && <label className="error">{this.state.errors.userName}</label>}
                        {this.state.errors.signinError && <label className="error">{this.state.errors.signinError}</label>}
                    </div>
                    <div className="button-container">
                        <button type="submit" className="primary">Submit</button>
                    </div>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Guest);

