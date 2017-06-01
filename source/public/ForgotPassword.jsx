import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {
                email: null,
            }
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
   
        setTimeout(() => {
            this.props.history.push('/resetpassword');
        }, 500);
    }

    render() {
        return (
            <div>
                <h1>Temporary Password Request</h1>
                <p>
                    THIS PAGE IS UNDER CONSTRUCTION
                </p>
                <form onSubmit={this.onSubmit} className="form">
                    <div className="field">
                        <label>Email</label>
                        <input name="email" />
                        {this.state.errors.email && <label className="error">{this.state.errors.email}</label>}
                    </div>
                   
                    <div className="button-container">
                        <button type="submit" className="primary">Send Request</button>
                    </div>
                </form>
            </div>
        )
    }
}

const ConnectedForgotPassword = connect()(ForgotPassword); // TODO: Is Connection needed?

export default ConnectedForgotPassword;
