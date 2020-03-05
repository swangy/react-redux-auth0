import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { Auth0Provider } from "./utils/react-auth0-spa";
import { AUTH_CONFIG } from './utils/config';
import * as serviceWorker from './serviceWorker';

const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
  <Provider store={store}>
      <Auth0Provider
          domain={AUTH_CONFIG.domain}
          client_id={AUTH_CONFIG.clientId}
          audience={AUTH_CONFIG.audience}
          redirect_uri={window.location.origin}
          onRedirectCallback={onRedirectCallback}
      >
          <App />
      </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
