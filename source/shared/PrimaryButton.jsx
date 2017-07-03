import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PrimaryButtonPresentation extends React.Component {
    constructor(props) {
        super(props);
        // TODO: Use a function instead of a class.
    }

    render() {
        let { onSubmit, onClick, isBusy, style, children } = this.props;
        return (
            <button className="primary"
                onClick={onSubmit || onClick}
                disabled={isBusy}
                style={style}>{children}</button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isBusy: state.apiStatus.countRequestsInProgress > 0
    };
}

const PrimaryButton = connect(mapStateToProps, undefined)(PrimaryButtonPresentation);

export default PrimaryButton;

