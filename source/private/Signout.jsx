import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Signout = ({ isSignedOut, onRequestSignout }) => {
    if( !isSignedOut ) {
        setTimeout(onRequestSignout, 1000);
    }

    return (
        <div>
            <h1>Stiry Sign-out</h1>
            {
                isSignedOut 
                ?
                <p>
                    You are now signed out of the private portions of this site.  You may still use public portions of this site.
                    If you want to sign in again, <Link to="/signin">click here</Link> or use the "Sign In" located in the top menu.
                </p>
                :
                <p>
                    Your request to sign out is in progress....
                </p>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isSignedOut: !state.isAuthorizedUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSignout: () => dispatch(signout())
    }
}

const ConnectedSignout = connect(mapStateToProps, mapDispatchToProps)(Signout); 

export default ConnectedSignout;
