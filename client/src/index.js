import React from 'react';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './css/zachCSS.scss';

import DevTools from './components/Dev/DevTools';
import configureStore from './store';

import AppWrapper from './AppWrapper';
const Store = configureStore();

ReactDOM.render(
    <AppContainer>
      <Provider store={Store}>
        <div>
          <AppWrapper />
          <DevTools />
        </div>
      </Provider>
    </AppContainer>,
    document.querySelector('#root'),
);
