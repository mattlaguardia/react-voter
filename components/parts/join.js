////////////////////////
// Audience Join Form //
////////////////////////
import React from 'react'
import { Link } from 'react-router'

var Join = React.createClass({
  join () {
    var memberName = this.refs.name.value // looks at ref
    console.log(memberName)
    this.props.emit("join", {name: memberName})
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
        <Link to="/speaker" className="btn btn-primary">Join as speaker</Link>
      </form>
    )
  }
})

export default Join
