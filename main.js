var React = require('react')
var ReactDOM = require('react-dom')
var Audience = require('./components/Audience')
var Speaker = require('./components/Speaker')
var Board = require('./components/Board')
var Whoops404 = require('./components/404')

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
