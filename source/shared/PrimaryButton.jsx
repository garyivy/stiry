import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PrimaryButtonPresentation extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        // TODO: We will not need enter key detection
        // console.log(event);

    }

    componentDidMount() {
        //window.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        //window.addEventListener("keydown", this.handleKeyPress);
    }

    render() {
        let { onSubmit, isBusy } = this.props;
        return (
            <button className="primary"
                onClick={onSubmit}
                disabled={isBusy}>GO</button>)
    }
}


const mapStateToProps = (state) => {
    return {
        isBusy: state.apiStatus.countRequestsInProgress > 0
    };
}

const PrimaryButton = connect(mapStateToProps, undefined)(PrimaryButtonPresentation);

export default PrimaryButton;

