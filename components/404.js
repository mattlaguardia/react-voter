import React from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

var Whoops404 = React.createClass({
  render() {
    return (
      <div id="not-found">
        <h1>Whoops something went wrong...</h1>
        <p>We cannot find the page that you have requested.</p>
        <p>Were you looking for one of these:</p>

        <p><Link to="/">Join as Audience</Link></p>
        <p><Link to="/speaker">Start the presentation</Link></p>
        <p><Link to="/board">View the board</Link></p>
      </div>
    )
  }
})

export default Whoops404
