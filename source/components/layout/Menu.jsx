import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const LargeMenuPresentation = ({ isAuthorizedUser }) => {
    return (
        <nav>
            <li><Link to="/">Home</Link></li>
            {isAuthorizedUser && <li><Link to="/start">Start Collaboration</Link></li>}
            {isAuthorizedUser && <li><Link to="/join">Join Collaboration</Link></li>}
            {isAuthorizedUser && <li><Link to="/signout">Sign Out</Link></li>}
            {!isAuthorizedUser && <li><Link to="/signin">Sign In</Link></li>}
            <li><Link to="/about">About</Link></li>
        </nav>
    )
};

const SmallMenuPresentation = ({ isAuthorizedUser, isExpanded, onToggleMenu }) => {
    return (
        <nav className="small-menu" onClick={onToggleMenu}>
            <li><a><i className="fa fa-bars"></i></a></li>
            {isExpanded && isAuthorizedUser && <li><Link to="/start">Start Collaboration</Link></li>}
            {isExpanded && isAuthorizedUser && <li><Link to="/join">Join Collaboration</Link></li>}
            {isExpanded && isAuthorizedUser && <li><Link to="/signout">Sign Out</Link></li>}
            {isExpanded && !isAuthorizedUser && <li><Link to="/signin">Sign In</Link></li>}
            {isExpanded && <li><Link to="/about">About</Link></li>}
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

