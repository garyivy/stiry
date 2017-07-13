import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ isBusy }) => (
    <header>
        <div className="header-content">
            <div>St<i>i</i>rytime
            {isBusy && <i className="fa fa-spinner fa-spin busy"></i>}
            </div>
        </div>
    </header>
);

const mapStateToProps = ({apiStatus}) => {
    return {
        isBusy: apiStatus.countRequestsInProgress > 0
    };
}

export default connect(mapStateToProps)(Header);

