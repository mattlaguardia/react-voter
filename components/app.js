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
      audience: [],
      speaker: ''
    }
  },

  componentWillMount() {
    this.socket = io('http://localhost:3000')
    this.socket.on('connect', this.connect)
    this.socket.on('disconnect', this.disconnect)
    this.socket.on('welcome', this.updateState)
    this.socket.on('joined', this.joined)
    this.socket.on('audience', this.updateAudience)
    this.socket.on('start', this.start)
    this.socket.on('end', this.updateState)
  },

  emit(eventName, payload) {
    this.socket.emit(eventName, payload)
  },
  connect() {

    var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null

    if(member && member.type === 'audience') {
      this.emit('join', member)
    } else if (member && member.type === 'speaker'){
      this.emit('start', {name: member.name, title: sessionStorage.title})
    }

    this.setState({status: 'connected'})
  },
  disconnect() {
    this.setState({
      status: 'disconnected'
    })
  },
  updateState(serverState) {
    this.setState(serverState)
  },
  joined(member) {
    sessionStorage.member = JSON.stringify(member)
    this.setState({ member: member })
  },
  updateAudience(audience) {
    this.setState({ audience: audience })
  },
  start(presentation){
    if(this.state.member.type === 'speaker'){
      sessionStorage.title = presentation.title
    }
    this.setState(presentation)
  },
  end() {
    this.setState({
      status: 'disconnected',
      title: 'Disconnected',
      speaker: ''
    })
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
