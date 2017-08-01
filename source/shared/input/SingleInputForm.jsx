import React from 'react';
import { connect } from 'react-redux';
import PrimaryButton from './PrimaryButton.jsx';
import { isNullOrWhitespace } from './utilities.js';

/*
    This is a responsive form containing and input element and button pair on one line.
    Screen width determines if there is a prompting label or placeholder.
*/
export const SingleInputFormPresentation = ({type, name, title,
    value, onChange, labelText, placeholder, buttonText, buttonTitle, onSubmit, error}) => (
    <form className="single-input-form" onSubmit={onSubmit}>
        {labelText && <label htmlFor={name}>{labelText}</label>}
        <input type={type} 
            name={name} 
            title={title} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange}/>
        <PrimaryButton title={buttonTitle}>{buttonText}</PrimaryButton>
        {error && <label className="error" htmlFor={name}>{error}</label>}
    </form>
);

export class SingleInputFormContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: props.value || '',
            error: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ value: event.target.value, error: null });
    }

    onSubmit(event) {
        event.preventDefault();

        if(isNullOrWhitespace(this.state.value)) {
            this.setState({ error: this.props.prompt + ' is required.'});
        } else {
            this.props.onSubmitValue(this.state.value);
        }
    }

    componentWillReceiveProps(nextProps) {
        // Allow parent to show error (such as after an API call to lookup the validatity of an input value).
        if(nextProps.error) {
            this.setState({ error: nextProps.error })
        }
    }

    render() {
        let { type, name, prompt, shortPrompt, buttonText, shortButtonText, onSubmitValue, screenWidth } = this.props;
        
        let labelText = prompt;
        let placeholder = null;
        let buttonDisplayText = buttonText;
        let buttonCaptionText = null;

        if(screenWidth < 600) {
            labelText = null;
            placeholder = prompt;

            if(screenWidth < 400) {
                placeholder = shortPrompt;
                buttonDisplayText = shortButtonText;
                buttonCaptionText = buttonText;
            }
        }

        return (
           <SingleInputFormPresentation 
                type={type} 
                name={name}
                title={prompt} 
                value={this.state.value} 
                onChange={this.onChange} 
                labelText={labelText} 
                placeholder={placeholder}
                buttonText={buttonDisplayText} 
                buttonTitle={buttonCaptionText} 
                onSubmit={this.onSubmit} 
                error={this.state.error}
           />
        )
    }
}

const mapStateToProps = ({windowSize}) => {
    return {
        screenWidth: windowSize.width
    }
}

export default connect(mapStateToProps)(SingleInputFormContainer);