var React = require('react')
var Display = require('./parts/Display')
import Join from './parts/Join'


var Audience = React.createClass({
  render () {
    return (
      <div>
        <Display if={this.props.status === 'connected'}>
          <h1>Join the session!</h1>
          <Join />
        </Display>
      </div>
    )
  }
})

export default Audience
