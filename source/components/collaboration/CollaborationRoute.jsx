import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const CollaborationRoute = ({ component: Component, ...rest }) => { 
    const isAuthorizedUser = () => rest.isAuthorizedUser; 
    const hasCollaborationToken = () => rest.collaborationToken != null; 
   
    return (
      <Route {...rest} render={ props => (
        isAuthorizedUser() 
          ? (hasCollaborationToken()
            ? (<Component {...props}/>) 
            : (<Redirect to={{ pathname: '/start', state: { from: props.location }}}/>))
          : (<Redirect to={{ pathname: '/signin', state: { from: props.location }}}/>)
      )}/>
    );
}

const mapStateToProps = ({authentication, collaboration}) => {
    return { 
        isAuthorizedUser: authentication.isAuthorized,
        collaborationToken: collaboration.collaborationToken 
    }
}

const ConnectedCollaborationRoute = connect(mapStateToProps, undefined)(CollaborationRoute);

export default ConnectedCollaborationRoute;
