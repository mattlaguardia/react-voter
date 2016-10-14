////////////////////////
// Main APP Component //
////////////////////////
import React from 'react'
import Audience from './Audience'
import Speaker from './Speaker'
import Board from './Board'

import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import io from 'socket.io-client'
import Header from './parts/Header'

var APP = React.createClass({

  getInitialState() {
    return {
      status: 'disconnected',
      title: '',
      member: {},
      audience: []
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:3000')
    this.socket.on('connect', this.connect)
    this.socket.on('disconnect', this.disconnect)
    this.socket.on('Welcome', this.welcome)
    this.socket.on('joined', this.joined)
    this.socket.on('audience', this.updateAudience)
  },

  emit(eventName, payload) {
    this.socket.emit(eventName, payload)
  },
  connect() {

    var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null

    if(member) {
      this.emit('join', member)
    }

    this.setState({status: 'connected'})
  },
  disconnect() {
    this.setState({status: 'disconnected'})
  },
  welcome(serverState) {
    this.setState({ title: serverState.title })
  },
  joined(member) {
    sessionStorage.member = JSON.stringify(member)
    this.setState({ member: member })
  },
  updateAudience(audience) {
    this.setState({ audience: audience })
  },

  render () {
    return (
      <div>
        <Header {...this.state} />
        { React.cloneElement(this.props.children, { emit: this.emit, ...this.state }) }
      </div>
    )
  }
})

export default APP
