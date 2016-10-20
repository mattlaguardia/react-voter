////////////////////////
// Audience Component //
////////////////////////
import React from 'react'
import Display from './parts/Display'
import Join from './parts/Join'
import Ask from './parts/Ask'

var Audience = React.createClass({
  render () {
    return (
      <div>
        <Display if={this.props.status === 'connected'}>
          <Display if={this.props.member.name}>

            <Display if={!this.props.currentQuestion}>
              <h2>Welcome {this.props.member.name}!</h2>
              <p>{this.props.audience.length} audience members connected</p>
              <p>Questions will appear here.</p>
            </Display>

            <Display if={this.props.currentQuestion}>
              <Ask question={this.props.currentQuestion} />
            </Display>
          </Display>

          <Display if={!this.props.member.name}>
            <h1>Join the session!</h1>
            <Join emit={this.props.emit} />
          </Display>
        </Display>
      </div>
    )
  }
})

export default Audience
