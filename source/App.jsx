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
const history = createBrowserHistory();
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from './actions/thunk.js';

import combinedReducer from './reducers/combinedReducer.js';

import './style/app.scss';

import PrivateRoute from './components/authentication/PrivateRoute.jsx';
import Header from './components/layout/Header.jsx';
import Menu from './components/layout/Menu.jsx';
import Home from './components/public/Home.jsx';
import Signin from './components/authentication/Signin.jsx';
import Signout from './components/authentication/Signout.jsx';
import StartSession from './components/collaboration/StartSession.jsx';
import JoinSession from './components/collaboration/JoinSession.jsx';
import Questionnaire from './components/collaboration/Questionnaire.jsx';
import Wait from './components/collaboration/Wait.jsx';
import Scrambled from './components/collaboration/Scrambled.jsx';
import About from './components/public/About.jsx';
import NewUser from './components/authentication/NewUser.jsx';
import ForgotPassword from './components/authentication/ForgotPassword.jsx';
import ResetPassword from './components/authentication/ResetPassword.jsx';
import Redirector from './components/layout/Redirector.jsx';

let store = createStore(combinedReducer, {}, applyMiddleware(thunk) );

// TODO: /questionnaire should redirect to /start if no collaborationToken
const layout = (
  <div>
    <Redirector/>
    <Header/>
    <Menu/>
    <article className="centered-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/register" component={NewUser} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset" component={ResetPassword} />
        <PrivateRoute path="/start" component={StartSession} />
        <PrivateRoute path="/join" component={JoinSession} />
        <PrivateRoute path="/questionnaire" component={Questionnaire} />
        <PrivateRoute path="/wait" component={Wait} />
        <Route path="/scrambled" component={Scrambled} />
        <Route path="/about" component={About} />
      </Switch>
    </article>
  </div>
);

render(
  <Provider store={store}><Router history={history}>{layout}</Router></Provider>,
    document.getElementById('app'));