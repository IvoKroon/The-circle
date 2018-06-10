import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import CircleStore from './stores/CircleStore';

ReactDOM.render(<App store={CircleStore} />, document.getElementById('root'));
