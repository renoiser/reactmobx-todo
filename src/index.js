import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import { enableLogging } from 'mobx-logger';
enableLogging();

ReactDOM.render(<App />, document.getElementById('root'));
