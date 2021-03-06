import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => { 
    const isAuthorizedUser = () => rest.isAuthorizedUser; // TODO: Could I simply check props.isAuthorizedUser in the Route render?
    return (
      <Route {...rest} render={ props => (
        isAuthorizedUser() 
          ? (<Component {...props}/>) 
          : (<Redirect to={{ pathname: '/signin', state: { from: props.location }}}/>)
      )}/>
    );
}

const mapStateToProps = ({authentication}) => {
    return { 
        isAuthorizedUser: authentication.isAuthorized 
    }
}

const ConnectedPrivateRoute = connect(mapStateToProps, undefined)(PrivateRoute);

export default ConnectedPrivateRoute;
