import React from 'react';
import { connect } from 'react-redux';

export default class Field extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            value: this.props.value != null ? this.props.value : '',
            error: null
        };
    }

    onChange(event) {
        // Note: Rather than bubbling this change up, the parent Form will scrape event.target 
        // The input is controlled only to echo user input and know when to reset error.
        this.setState({ value: event.target.value, error: null });
    }

    componentWillReceiveProps({ value, error }) {
        this.setState({ value: value != null ? value : this.state.value, error });
    }

    render() {
        let { type, name, label } = this.props;

        return (
            <div className="field">
                <label htmlFor={name}>{label}</label>
                {type === 'textarea'
                    ?
                    <textarea name={name}
                        value={this.state.value}
                        onChange={this.onChange}
                        placeholder={label}
                    />
                    :
                    <input name={name}
                        type={type}
                        value={this.state.value}
                        onChange={this.onChange}
                        placeholder={label}
                    />
                }
                {this.state.error && <label className="error" htmlFor={name}>{this.state.error}</label>}
            </div>
        )
    }
}
