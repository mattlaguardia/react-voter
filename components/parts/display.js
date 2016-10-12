// if else statement in react
// return (condition) ? "The condition is True" : "The condition is false"
var React = require('react')

var Display = React.createClass({
  render () {
    // this is our if statement //
    return (this.props.if) ? <div>{this.props.children}</div> : null
  }
})

export default Display
