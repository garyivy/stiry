import React from 'react';
import { render } from 'react-dom';
import './style/app.scss';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => <div><i className="fa fa-home"></i><h1>Hello from Home!!</h1></div>;
const StirySession = () => <h1>Stiry Session</h1>;

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/session">Session</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/session" component={StirySession}/>
    </div>
  </Router>
)
export default App

render(<App />, document.getElementById('app'));