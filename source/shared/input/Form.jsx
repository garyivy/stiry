import React from 'react';
import { connect } from 'react-redux';

const extractFormValues = elements => [].reduce.call(elements, (data, element) => {
    if (element.tagName !== 'BUTTON') {
        data[element.name] = element.value;
    }
    return data;
}, {});

export class Form extends React.Component {
    constructor(props) {
        super(props);

        this.buttonClicked = null;

        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);

        this.state = {};
    }

    onClick(event) {
        if (event.target.tagName === 'BUTTON') {
            this.buttonClicked = event.target.name;
        }
    }

    onSubmit(event) {
        event.preventDefault();
        // A PrimaryButton was clicked.
        !this.props.isBusy && this.props.onSubmit(extractFormValues(event.target), this.buttonClicked);
    }

    onReset(event) {
        event.preventDefault();
        // A SecondaryButton was clicked.
        !this.props.isBusy && this.props.onSubmit(extractFormValues(event.target), this.buttonClicked);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} onReset={this.onReset} onClick={this.onClick}>{this.props.children}</form>
        )
    }
}

const mapStateToProps = ({ apiStatus }) => {
    return {
        isBusy: apiStatus.countRequestsInProgress > 0
    };
}

export default connect(mapStateToProps)(Form);
