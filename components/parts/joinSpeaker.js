///////////////////////
// Speaker Join Form //
///////////////////////
import React from 'react'

var JoinSpeaker = React.createClass({
  start () {
    var speakerName = this.refs.name.value
    var title = this.refs.title.value
    this.props.emit('start', { name: speakerName, title: title })
  },

  render () {
    return (
      <form action="javascript:void(0)" onSubmit={this.start}>
        <label>Full Name</label>
        <input ref="name"
               className="form-control"
               placeholder="Enter your full name..."
               required />
        <label>Presentation Title</label>
        <input ref="title"
               className="form-control"
               placeholder="Enter a title for this presentation..."
               required />
        <button className="btn btn-primary">Join</button>
      </form>
    )
  }
})

export default JoinSpeaker
