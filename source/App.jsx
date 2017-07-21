import React from 'react';
import { render } from 'react-dom';

// Routing
import { BrowserRouter, Route,  Link,  Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './components/authentication/PrivateRoute.jsx';
import CollaborationRoute from './components/collaboration/CollaborationRoute.jsx';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import combinedReducer from './reducers/combinedReducer.js';
import thunk from './actions/thunk.js';

// Components
import Header from './components/layout/Header.jsx';
import Menu from './components/layout/Menu.jsx';
import Home from './components/public/Home.jsx';
import Signin from './components/authentication/Signin.jsx';
import Signout from './components/authentication/Signout.jsx';
import StartCollaboration from './components/collaboration/StartCollaboration.jsx';
import JoinCollaboration from './components/collaboration/JoinCollaboration.jsx';
import Questionnaire from './components/collaboration/Questionnaire.jsx';
import Wait from './components/collaboration/Wait.jsx';
import Scrambled from './components/collaboration/Scrambled.jsx';
import About from './components/public/About.jsx';
import NewUser from './components/authentication/NewUser.jsx';
import ForgotPassword from './components/authentication/ForgotPassword.jsx';
import ResetPassword from './components/authentication/ResetPassword.jsx';
import Redirector from './components/layout/Redirector.jsx';
import Resizer from './components/layout/Resizer.jsx';

// Style
import './style/app.scss';

// Layout
const layout = (
  <div>
    <Resizer/>
    <Redirector/>
    <div className="fixed-header">
      <Header/>
      <Menu/>
    </div>
    <div className="main-aside-content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/register" component={NewUser} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset" component={ResetPassword} />
        <PrivateRoute path="/start" component={StartCollaboration} />
        <PrivateRoute path="/join" component={JoinCollaboration} />
        <CollaborationRoute path="/questionnaire" component={Questionnaire} />
        <CollaborationRoute path="/wait" component={Wait} />
        <CollaborationRoute path="/scrambled" component={Scrambled} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  </div>
);

// Stitching it together
let store = createStore(combinedReducer, {}, applyMiddleware(thunk) );
const history = createBrowserHistory();
render(
  <Provider store={store}>
    <BrowserRouter history={history}>{layout}</BrowserRouter>
  </Provider>,
  document.getElementById('app'));