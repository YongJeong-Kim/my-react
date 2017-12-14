import '../../../typeface-roboto/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { Provider } from "react-redux"
import store from "../../store"

const rootEl = document.getElementById('login');
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, rootEl);
