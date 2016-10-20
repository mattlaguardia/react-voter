var React = require('react')
var ReactDOM = require('react-dom')
var Audience = require('./components/audience.js')
var Speaker = require('./components/speaker.js')
var Board = require('./components/board.js')
var Whoops404 = require('./components/404.js')

//////////////////
// React Routes //
//////////////////
import { Router, Route, Link, IndexRoute, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
var NotFoundRoute = Router.NotFoundRoute


var APP = require('./components/APP')
var routes = (
  <Route path='/' component={APP}>
    <IndexRoute component={Audience} />
      <Route path='speaker' component={Speaker} />
      <Route path='board' component={Board} />
    <Route path="*" component={Whoops404} />
  </Route>
)

ReactDOM.render(<Router history={appHistory} routes={routes} />, document.getElementById('react-container'))
