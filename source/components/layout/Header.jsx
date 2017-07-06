import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderPresentation = ({ isAuthorizedUser, isBusy }) => (
    <header>
        <div className="content-wrapper">
            <div>St<i>i</i>rytime
            {isBusy && <i className="fa fa-spinner fa-spin busy"></i>}
            </div>
        </div>
    </header>
);

const mapStateToProps = (state) => {
    return {
        isAuthorizedUser: state.authentication.isAuthorizedUser,
        isBusy: state.apiStatus.countRequestsInProgress > 0
    };
}

const Header = connect(mapStateToProps, undefined)(HeaderPresentation);

export default Header;

