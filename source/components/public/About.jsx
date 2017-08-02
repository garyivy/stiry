import React from 'react';

const About = () => (
    <div>
        <main>
            <h1>About Stirytime</h1>
            <h2>Why was this site built?</h2>
            <p>
                This site was built to demonstrate Single Page Application (SPA) technolgies such as <b>React</b>.  My goal is to build the same site in <b>Angular</b> as a means comparison.
            </p>
            <p>
                As a bonus, it provides an electronic alternative to a pen and paper version of a game we play at home with friends and family.
            </p>
            <p>
                The site has been designed as a <b>responsive site</b>.  
                This means it works on a wide variety of devices and display sizes.
                Most of this has been accomplished using CSS media queries.
            </p>
            <h2>How do I use Stirytime?</h2>
            <p>
                After logging in, use the menu to Start a "collaboration" for you and your participants.
                Or, if a "collaboration" is already started, you can use the menu to Join a session.
            </p>
        </main>
        <aside>
            <h1>Technologies</h1>
            <ul>
                <li><a href="https://facebook.github.io/react/">Reactjs</a></li>
                <li><a href="http://redux.js.org/docs/introduction/index.html">Redux</a></li>
                <li><a href="https://expressjs.com/">Express</a></li>
                <li><a href="https://www.mongodb.com/">MongoDB</a></li>
                <li><a href="https://webpack.github.io/">Webpack</a></li>
                <li><a href="https://expressjs.com/">Express</a></li>
                <li><a href="https://aws.amazon.com/">Amazon Web Services</a></li>
            </ul>
        </aside>
    </div>
);

export default About;