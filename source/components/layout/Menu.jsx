import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LargeMenuPresentation = ({ isAuthorizedUser }) => {
    return (
        <nav>
            <div className="content-wrapper">
                <Link to="/">Home</Link>
                {isAuthorizedUser && <Link to="/start">Start Collaboration</Link>}
                {isAuthorizedUser && <Link to="/join">Join Collaboration</Link>}
                {isAuthorizedUser && <Link to="/signout">Sign Out</Link>}
                {!isAuthorizedUser && <Link to="/signin">Sign In</Link>}
                <Link to="/about">About</Link>
            </div>
        </nav>
    )
};

const SmallMenuPresentation = ({ isAuthorizedUser, isExpanded, onToggleMenu }) => {
    return (
        <nav className="small-menu" onClick={onToggleMenu}>
            <div className="content-wrapper">
                <a><i className="fa fa-bars"></i></a>
                {isExpanded && isAuthorizedUser && <Link to="/start">Start Collaboration</Link>}
                {isExpanded && isAuthorizedUser && <Link to="/join">Join Collaboration</Link>}
                {isExpanded && isAuthorizedUser && <Link to="/signout">Sign Out</Link>}
                {isExpanded && !isAuthorizedUser && <li><Link to="/signin">Sign In</Link></li>}
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
    }

    onToggleMenu() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    render() {
        return this.props.windowSize.width < 525
            ? <SmallMenuPresentation 
                isAuthorizedUser={this.props.isAuthorizedUser} 
                onToggleMenu={this.onToggleMenu} 
                isExpanded={this.state.isExpanded}/>
            : <LargeMenuPresentation 
                isAuthorizedUser={this.props.isAuthorizedUser} />
    }
}

const mapStateToProps = ({ authentication, windowSize }) => {
    return {
        isAuthorizedUser: authentication.isAuthorized,
        windowSize
    };
}

const Menu = connect(mapStateToProps, undefined)(MenuContainer);

export default Menu;

