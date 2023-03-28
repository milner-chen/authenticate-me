import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, { restoreCSRF } from './store/csrf';

const store = configureStore();

if (process.env.NOVE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// if there is no token
if (sessionStorage.getItem('X-CSRF-Token') === null) {
  // restore token + then render app
  restoreCSRF().then(renderApplication);
  // if there is a token, then render app
} else renderApplication();

