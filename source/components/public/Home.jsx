import React from 'react';
import { isNullOrWhitespace } from './../../shared/utilities.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import JoinCollaborationForm from './../../shared/JoinCollaborationForm.jsx';

export const Home = ({ isLoggedInRegisterUser }) => {
    return (
        <div>
            <main>
                <h1>Welcome to Stirytime</h1>
                <h2>What is Stirytime?</h2>
                <p>
                    Stirytime is a little like "Mad Libs".
                    Participants answer questions to complete a story.
                    Then, each participant receives a scrambled story based upon answers given by other participants.
                    Registered users start a "collaboration" and receive a "collaboration code" so that others can join them.
                </p>
                
                <h2>Do you want to join a collaboration { isLoggedInRegisterUser ? '?' : 'as a guest?' }</h2>
                <p>
                    {
                        isLoggedInRegisterUser
                            ? 'Enter a six digit code provided by the participant who started the collaboration'
                            : 'Unregistered users can play as guests by getting a six-digit "collaboration code" from a registered user.'
                    }
                </p>
                <JoinCollaborationForm isGuest={!isLoggedInRegisterUser}/>

                <h2>How do I start a Stirytime collaboration?</h2>
                {
                    !isLoggedInRegisterUser &&
                    <ol>
                        <li>If you have not done, register as new user <Link to="/register">by clicking here</Link>.</li>
                        <li>Once registered, sign in <Link to="/signin">by clicking here</Link>.</li>
                        <li>From the menu, choose "Start Collaboration".</li>
                        <li>Note the "Collaboration Code" that is generated.</li>
                        <li>Ask participants to join by using that code.</li>
                    </ol>
                }
                {
                    isLoggedInRegisterUser &&
                    <ul>
                        <li>Begin <Link to="/start">by clicking here</Link>.</li>
                        <li>From there, you will be given further directions.</li>
                    </ul>
                }
            </main>
            <aside>
                <h1>Related Links</h1>
                <a href="http://www.madlibs.com/">Mad Libs</a>
                <br />
                <a href="https://www.wordblanks.com/">Word Blanks</a>
                <br />
                <a href="https://www.eduplace.com/tales/">Wacky Web Tales</a>
            </aside>
        </div>
    )
};

const mapStateToProps = ({ authentication, collaboration, windowSize }) => {
    return {
        isLoggedInRegisterUser: authentication.isAuthorized && !authentication.isGuest,
    }
}

export default connect(mapStateToProps)(Home);