import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { Logo } from './Logo.jsx';
import { MENU_BREAKPOINT, MENU_ABOUT_HIDE_BREAKPOINT, MENU_SHORTEN_NAMES_BREAKPOINT } from './../../style/breakpoints.js';

const LargeMenuPresentation = ({ isAuthorizedUser, shouldUseShortNames, shouldShowAbout, isLoggedInRegisterUser }) => {
    let startCollaboration = 'Start Collaboration';
    let joinCollaboration = 'Join Collaboration';

    if (shouldUseShortNames) {
        startCollaboration = 'Start';
        joinCollaboration = 'Join';
    }

    return (
        <nav>
            <div className="nav-content">
                <Link to="/">Home</Link>
                {isLoggedInRegisterUser && <Link to="/start">{startCollaboration}</Link>}
                {isAuthorizedUser && <Link to="/join">{joinCollaboration}</Link>}
                {isLoggedInRegisterUser && <Link to="/signout">Sign Out</Link>}
                {!isAuthorizedUser && <Link to="/signin">Sign In</Link>}
                {shouldShowAbout && <Link to="/about">About</Link>}
            </div>
        </nav>
    )
};

const SmallMenuPresentation = ({ isAuthorizedUser, isExpanded, onToggleMenu, isBusy, isLoggedInRegisterUser }) => {

    return (
        <nav onClick={onToggleMenu}>
            <div className="nav-content">
                <a>
                    <Logo/>
                    <div className="navicon"><i className="fa fa-bars"></i></div>   
                </a>
                {isExpanded && <Link to="/">Home</Link>}
                {isExpanded && isLoggedInRegisterUser && <Link to="/start">Start Collaboration</Link>}
                {isExpanded && isAuthorizedUser && <Link to="/join">Join Collaboration</Link>}
                {isExpanded && isLoggedInRegisterUser && <Link to="/signout">Sign Out</Link>}
                {isExpanded && !isAuthorizedUser && <Link to="/signin">Sign In</Link>}
                {isExpanded && <Link to="/about">About</Link>}
            </div>
        </nav>
    )
};

class MenuContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isExpanded: false };
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        // Adding listener to capture clicks outside of component as a way of knowing when to collapse menu.
        window.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClick);
    }

    onClick() {
        if (this.wasToggleClicked) {
            this.wasToggleClicked = false;
        } else {
            this.setState({ isExpanded: false });
        }
    }

    onToggleMenu() {
        this.wasToggleClicked = true; // Suppress onClick() handler
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    render() {
        return this.props.windowSize.width <= MENU_BREAKPOINT
            ? <SmallMenuPresentation
                isBusy={this.props.isBusy}
                isAuthorizedUser={this.props.isAuthorizedUser}
                isLoggedInRegisterUser={this.props.isLoggedInRegisterUser}
                onToggleMenu={this.onToggleMenu}
                isExpanded={this.state.isExpanded} />
            : <LargeMenuPresentation
                isAuthorizedUser={this.props.isAuthorizedUser}
                isLoggedInRegisterUser={this.props.isLoggedInRegisterUser}                
                shouldUseShortNames={this.props.windowSize.width < MENU_SHORTEN_NAMES_BREAKPOINT}
                shouldShowAbout={this.props.windowSize.width > MENU_ABOUT_HIDE_BREAKPOINT || !this.props.isAuthorizedUser}
            />
    }
}

const mapStateToProps = ({ authentication, apiStatus, windowSize }) => {
    return {
        isLoggedInRegisterUser: authentication.isAuthorized && !authentication.isGuest,
        isAuthorizedUser: authentication.isAuthorized,
        isBusy: apiStatus.countRequestsInProgress > 0,
        windowSize
    };
}

const Menu = connect(mapStateToProps, undefined)(MenuContainer);

export default Menu;

