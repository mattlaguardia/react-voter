var React = require('react');
var ReactDOM = require('react-dom');
var Audience = require('./components/Audience')
var Speaker = require('./components/Speaker')
var Board = require('./components/Board')

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

var APP = require('./components/APP');

var routes = (
  <Router history={hashHistory}>{routes}
    <Route path='/' component={Audience} />
    <Route path='speaker' component={Speaker} />
    <Route path='board' component={Board} />
  </Router>
);

ReactDOM.render(<APP>{routes}</APP>, document.getElementById('react-container'));
