import React from 'react';
import { Link } from 'react-router-dom';
import JoinCollaborationForm from './../../shared/JoinCollaborationForm.jsx';

export const JoinCollaboration = () => (
    <main>
        <h1>Join a Stiry Collaboration</h1>
        <JoinCollaborationForm isGuest={false}/>
        <h2>Directions</h2>
        <p className="responsive-content-regular">
            Use this if you want to join a "Collaboration" that another has started.  Enter the six digit code they provide and click "Join".
            <br/>
            <br/>
            If you are interested in starting one for others to join,
            &nbsp;<Link to="/start">click here</Link> or choose "Start&nbsp;Collaboration" from the site menu.
        </p>
        <p className="responsive-content-small">
            Note: The person in your group that started the collaboration should provide the code.
            <br/><br/>
            To start a collaboration, <Link to="/start">click here.</Link>
        </p>        
    </main>
);

export default JoinCollaboration;
