import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const SecondaryButton = 
    ({ isBusy, disabled, children, dispatch, type, onclick, name, ...rest }) => (
    <button name={name} type="reset" disabled={isBusy || disabled} 
        {...rest}>{children}</button>
)

const mapStateToProps = (state) => {
    return {
        isBusy: state.apiStatus.countRequestsInProgress > 0
    };
}

export default connect(mapStateToProps)(SecondaryButton);

