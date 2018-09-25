import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import register, { unregister } from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
register();
