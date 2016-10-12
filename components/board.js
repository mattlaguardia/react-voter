import React from 'react'

var Board = React.createClass({
  render () {
    return (
      <h1>Board: {this.props.dance}</h1>
    )
  }
})

module.exports = Board
