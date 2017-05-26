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
import Logoff from './login/Logoff.jsx';
import StartSession from './session/StartSession.jsx';
import Questionnaire from './session/Questionnaire.jsx';
import About from './home/About.jsx';
import NewUser from './home/NewUser.jsx';
import ForgotPassword from './home/ForgotPassword.jsx';
import NewPassword from './home/NewPassword.jsx';

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
        <Route path="/logoff" component={Logoff} />
        <Route path="/newuser" component={NewUser} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/newpassword" component={NewPassword} />
        <PrivateRoute path="/start" component={StartSession} />
        <PrivateRoute path="/join" component={StartSession} />
        <PrivateRoute path="/questionnaire" component={Questionnaire} />
        <Route path="/about" component={About} />
      </Switch>
    </article>
  </div>
);

render(
  <Provider store={store}><Router history={history}>{layout}</Router></Provider>,
    document.getElementById('app'));