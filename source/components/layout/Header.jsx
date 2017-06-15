import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderPresentation = ({isAuthorizedUser, isBusy}) => (
    <div className="top-header">
        <div>St<i>i</i>ry</div>
        {
            isBusy && <span>BUSY</span>
        }
    </div>
);

const mapStateToProps = (state) => {
    return { 
        isAuthorizedUser: state.authentication.isAuthorizedUser,
        isBusy: state.apiStatus.countRequestsInProgress > 0
    };
}

const Header = connect(mapStateToProps, undefined)(HeaderPresentation);

export default Header;

