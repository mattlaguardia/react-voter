var React = require('react');
var Audience = require('./Audience')
var Speaker = require('./Speaker')
var Board = require('./Board')

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({

  getInitialState() {
    return {
      status: 'disconnected',
      title: ''
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('Welcome', this.welcome)
  },

  connect() {
    this.setState({status: 'connected'});
  },

  disconnect() {
    this.setState({status: 'disconnected'});
  },

  welcome(serverState) {
    this.setState({ title: serverState.title })
  },

  // app literal in react -> render function //
  render () {
    return (
      <div>
        <Header title={this.state.title} status={this.state.status} />

        <Router history={hashHistory}>
          <Route path='/' component={Audience} />
          <Route path='speaker' component={Speaker} />
          <Route path='board' component={Board} />
          <Route path='*' component={NoMatch} />
        </Router>

      </div>
    );
  }
});

export default APP;
