import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const PrimaryButton = 
    ({ isBusy, disabled, children, onClick, dispatch, name, ...rest }) => ( // Note: onClick not used since button type is submit (Form onSubmit expected)
    <button type="submit" 
        className="primary"
        name={name || 'primary'}
        disabled={isBusy || disabled} 
        {...rest}>{children}</button>
)

const mapStateToProps = (state) => {
    return {
        isBusy: state.apiStatus.countRequestsInProgress > 0
    };
}

export default connect(mapStateToProps)(PrimaryButton);

