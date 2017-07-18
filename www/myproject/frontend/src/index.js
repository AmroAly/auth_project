import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import async from './middlewares/async';
import AUTH_USER from './actions/types';

const createStoreWithMiddleware = applyMiddleware(async, reduxThunk)(createStore);
const store =createStoreWithMiddleware(reducers);
//
// const token = localStorage.getItem('token');
// // If we have  a token, consider the user to be authenticated
// if(token) {
//     store.dispatch({ type: AUTH_USER });
// }

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Welcome} />
            <Route path="signin" component={SignIn}/>
            <Route path="signout" component={SignOut}/>
            <Route path="signup" component={Signup}/>
            <Route path="feature" component={RequireAuth(Feature)} />
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.app'));
