import React from 'react';

const About = () => (
    <div>
        <main>
            <h1>About Stirytime</h1>
            <h2>Why was this site built?</h2>
            <p>
                This site was built to demonstrate Single Page Application (SPA) technolgies such as React and Angular.
            And as a bonus, it provides an electronic alternative to a pen and paper version of a game we play at home with friends and family.
        </p>
            <h2>How do I use Stirytime?</h2>
            <p>
                After logging in, use the menu to Start a "collaboration" for you and your participants.
            Or, if a session is already started, you can use the menu to Join a session.
        </p>
        </main>
        <aside>
            <h1>Technologies Used</h1>
            <a href="https://facebook.github.io/react/">Reactjs</a>
            <br/><a href="http://redux.js.org/docs/introduction/index.html">Redux</a>
            <br/><a href="https://expressjs.com/">Express</a>
            <br/><a href="https://www.mongodb.com/">MongoDB</a>
            <br/><a href="https://webpack.github.io/">Webpack</a>
        </aside>
    </div>
);

export default About;