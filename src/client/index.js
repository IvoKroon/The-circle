import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
// import CircleStore from './stores/CircleStore';
import TestStore from './stores/TestStore';

ReactDOM.render(<App store={TestStore} />, document.getElementById('root'));
