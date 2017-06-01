import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderPresentation = ({isAuthorizedUser}) => (
    <div className="top-header">
        <div>St<i>i</i>ry</div>
    </div>
);

const mapStateToProps = (state) => {
    return { isAuthorizedUser: state.isAuthorizedUser };
}

const Header = connect(mapStateToProps, undefined)(HeaderPresentation);

export default Header;

