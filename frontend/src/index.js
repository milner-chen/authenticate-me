import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider } from './context/Modal';

// let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
// let initialState = {};

// if (currentUser) {
//     initialState = {
//         user: {
//         [currentUser.id]: currentUser
//         }
//     };
// };

const store = configureStore();

if (process.env.NOVE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

// wrap Root in our modal context provider
const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// if there is no token
if (sessionStorage.getItem('X-CSRF-Token') === null
|| sessionStorage.getItem('currentUser') === null) {
  // restore token + then render app
  // remember that thunk actions have to be dispatched 
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
  // if there is a token, then render app
} else renderApplication();

