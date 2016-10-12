////////////////////////
// Audience Join Form //
////////////////////////
import React from 'react'

var Join = React.createClass({
  join () {
    var memberName = this.refs.name.value // looks at ref
    alert("TODO: Join Member " + memberName)
  },

  render () {
    return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <label>Full Name</label>
        <input ref="name" // this is reference in React
               className="form-control"
               placeholder="Enter your full name..."
               required />
        <button className="btn btn-primary">Join</button>
      </form>
    )
  }
})

export default Join
