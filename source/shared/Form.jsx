import React from 'react';
import { connect } from 'react-redux';

// TODO: Refactor Form, add features
export const Field = (props) => (
    <span></span>
)

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        let values = {};
        let errors = {};

        React.Children.map(props.children, child => {
            if(child && child.type && child.type === Field) {
                values[child.props.name] = child.props.value || '';
                errors[child.props.name + '_error'] = child.props.error;
            }
        });

        this.state = {...values, ...errors};
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value, [event.target.name + '_error']: null });
    }

    onSubmit(event) {
        event.preventDefault();
        
        let values = {};
        React.Children.map(this.props.children, child => {
            if(child && child.type && child.type === Field) {
                values[child.props.name] = this.state[child.props.name];
            }
        });

        !this.props.isBusy && this.props.onSubmit(values);
    }

    componentWillReceiveProps({children}) {
        let errors = {};

        React.Children.map(children, child => {
            if(child && child.type && child.type === Field) {
                console.log(child);
                errors[child.props.name + '_error'] = child.props.error;
            }
        });

        this.setState(errors);
    }

    render() {
        let { onSubmit, children, isBusy, dispatch, placeholder, ...rest } = this.props; // Note: onSubmit not used in render, listed so it not included in ...rest

        let fields = React.Children.map(children, child => {
            return child && child.type && child.type === Field ?
                <div className="field">
                    <label htmlFor={child.props.name}>{child.props.label}</label>
                    <input name={child.props.name}
                        type={child.props.type}
                        value={this.state[child.props.name]}
                        onChange={this.onChange} 
                        placeholder={child.props.label}
                        {...rest}/>
                    {this.state[child.props.name + '_error']
                        && <label className="error" htmlFor={child.props.name}>{this.state[child.props.name + '_error']}</label>}
                </div>
                : child
        });

        return (
            <form {...rest} onSubmit={this.onSubmit}>{fields}</form>
        )
    }
}

const mapStateToProps = ({ apiStatus }) => {
    return {
        isBusy: apiStatus.countRequestsInProgress > 0
    };
}

export default connect(mapStateToProps)(Form);
