import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const MenuPresentation = ({isAuthorizedUser}) => (
    <nav>
        <li><Link to="/">Home</Link></li>
        { isAuthorizedUser && <li><Link to="/start">Start Session</Link></li> }
        { isAuthorizedUser && <li><Link to="/join">Join Session</Link></li> }
        { isAuthorizedUser && <li><Link to="/signout">Sign Out</Link></li> }
        { !isAuthorizedUser && <li><Link to="/signin">Sign In</Link></li> }
        <li><Link to="/about">About</Link></li>        
    </nav>
);

const mapStateToProps = (state) => {
    return { isAuthorizedUser: state.user.isAuthorized };
}

const Menu = connect(mapStateToProps, undefined)(MenuPresentation);

export default Menu;

