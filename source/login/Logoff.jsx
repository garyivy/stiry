import React from 'react';
import { isNullOrWhitespace } from './../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Logoff = ({ isLoggedOff, onRequestLogoff }) => {
    if( !isLoggedOff ) {
        setTimeout(onRequestLogoff, 1000);
    }

    return (
        <div>
            <h1>Stiry Logoff</h1>
            {
                isLoggedOff 
                ?
                <p>
                    You are now logged off the private portions of this site.  You may still use public portions of this site.
                    If you want to log on again, <Link to="/login">click here</Link> or use the "Log On" located in the top menu.
                </p>
                :
                <p>
                    Your request to logoff is in progress....
                </p>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isLoggedOff: !state.isAuthorizedUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestLogoff: () => dispatch({ type: 'LOGOFF'})
    }
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Logoff); 

export default ConnectedLogin;
