import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LargeMenuPresentation = ({ isAuthorizedUser, shouldUseShortNames, shouldShowAbout }) => {
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
                {isAuthorizedUser && <Link to="/start">{startCollaboration}</Link>}
                {isAuthorizedUser && <Link to="/join">{joinCollaboration}</Link>}
                {isAuthorizedUser && <Link to="/signout">Sign Out</Link>}
                {!isAuthorizedUser && <Link to="/signin">Sign In</Link>}
                {!isAuthorizedUser && <Link to="/guest">Guest</Link>}
                {shouldShowAbout && <Link to="/about">About</Link>}
            </div>
        </nav>
    )
};

const SmallMenuPresentation = ({ isAuthorizedUser, isExpanded, onToggleMenu, isBusy }) => {

    return (
        <nav className="small-menu" onClick={onToggleMenu}>
            <div className="nav-content">
                <a>
                    <div className="pull-left">St<i>i</i>rytime{isBusy && <i className="fa fa-spinner fa-spin busy"></i>}</div>
                    <div className="pull-right"><i className="fa fa-bars"></i></div>
                </a>
                {isExpanded && isAuthorizedUser && <Link to="/start">Start Collaboration</Link>}
                {isExpanded && isAuthorizedUser && <Link to="/join">Join Collaboration</Link>}
                {isExpanded && isAuthorizedUser && <Link to="/signout">Sign Out</Link>}
                {isExpanded && !isAuthorizedUser && <Link to="/signin">Sign In</Link>}
                {isExpanded && !isAuthorizedUser && <Link to="/guest">Guest</Link>}
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
        return this.props.windowSize.width < 480 // Note: Keep this constant in sync with $menu-breakpoint in layout.scss
            ? <SmallMenuPresentation
                isBusy={this.props.isBusy}
                isAuthorizedUser={this.props.isAuthorizedUser}
                onToggleMenu={this.onToggleMenu}
                isExpanded={this.state.isExpanded} />
            : <LargeMenuPresentation
                isAuthorizedUser={this.props.isAuthorizedUser}
                shouldUseShortNames={this.props.windowSize.width < 635}
                shouldShowAbout={this.props.windowSize.width > 570 || !this.props.isAuthorizedUser}
            />
    }
}

const mapStateToProps = ({ authentication, apiStatus, windowSize }) => {
    return {
        isAuthorizedUser: authentication.isAuthorized,
         isBusy: apiStatus.countRequestsInProgress > 0,
        windowSize
    };
}

const Menu = connect(mapStateToProps, undefined)(MenuContainer);

export default Menu;

