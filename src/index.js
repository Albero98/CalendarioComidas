import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/CalendarPrincipal.css';
import './assets/css/NavbarPrincipal.css';
import './assets/css/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import Routing from './components/Routing'

ReactDOM.render((<Routing />),document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
