import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { post } from './../shared/api.js';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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
            post('forgot', {
                email: this.state.email
            }).then( result => {
                console.log(result);
                //this.props.dispatch({ type: 'LOGIN_COMPLETE', userName: this.state.userName });
                //this.props.history.push('/');
            });
        }
    }

    hasErrors() {
        let errors = {};

        if(isNullOrWhitespace(this.state.email)) {
            errors.password = 'Email is required.';
        } 

        this.setState({ errors: errors });

        return Object.keys(errors).length > 0;
    }

    render() {
        return (
            <div>
                <h1>Forgot Password</h1>
                <p>
                    Use this page to have a "password reset" email sent to you.
                    When the email arrives, click on the link.
                </p>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>Email</label>
                        <input name="email" value={this.state.email} onChange={this.onChange} maxLength="40" />
                         {this.state.errors.email && <label className="error">{this.state.errors.email}</label>}
                    </div>
                    <div className="button-container">
                        <button type="submit" className="primary" onClick={this.onSubmit}>Send Request</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(ForgotPassword); // TODO: Should connect be used here?

