import React from 'react';

const Home = () => (
    <div>
        <main>
            <h1>Welcome to Stirytime</h1>
            <h2>What is Stirytime?</h2>
            <p>
                Stirytime is a little like "Mad Libs".
                Participants answer questions to complete a story.
                Then, each participant receives a scrambled story based upon answers given by other participants.
            </p>
            <h2>How do I use Stirytime?</h2>
            <p>
                After logging in, use the menu to start a "collaboration" for you and your participants.
                Or, if a collaboration is already started, you can use the menu to join a collaboration.
                Note: Whoever starts a collaboration will provide it's name.
            </p>
        </main>
        <aside>
            <h1>Related Links</h1>
            <a href="http://www.madlibs.com/">Mad Libs</a>
            <br/>
            <a href="https://www.wordblanks.com/">Word Blanks</a>
            <br/>
            <a href="https://www.eduplace.com/tales/">Wacky Web Tales</a>
        </aside>
    </div>
);

export default Home;