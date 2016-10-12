////////////////////////
// Audience Component //
////////////////////////
import React from 'react'
import Display from './parts/Display'
import Join from './parts/Join'

var Audience = React.createClass({
  render () {
    return (
      <div>
        <Display if={this.props.status === 'connected'}>
          <h1>Join the session!</h1>
          <Join emit={this.props.emit} />
        </Display>
      </div>
    )
  }
})

export default Audience
