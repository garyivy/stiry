import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter  
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import  initialStore  from './shared/initialStore.js';
import reducer from './shared/reducer.js';

import './style/app.scss';

import PrivateRoute from './login/PrivateRoute.jsx';
import Header from './home/Header.jsx';
import Menu from './home/Menu.jsx';
import Home from './home/Home.jsx';
import Login from './login/Login.jsx';
import StartSessionPromptContainer from './session/StartSessionPromptContainer.jsx';
import Questionnaire from './session/Questionnaire.jsx';
import About from './home/About.jsx';

let store = createStore(reducer, initialStore);
const history = createBrowserHistory();

const layout = (
  <div>
    <Header/>
    <Menu/>
    <article className="centered-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/start" component={StartSessionPromptContainer} />
        <PrivateRoute path="/join" component={StartSessionPromptContainer} />
        <Route path="/questionnaire" component={Questionnaire} />
        <Route path="/about" component={About} />
      </Switch>
    </article>
  </div>
);

render(
  <Provider store={store}><Router history={history}>{layout}</Router></Provider>,
  document.getElementById('app'));