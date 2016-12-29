import React, { Component } from 'react'
import {Router, Route, IndexRoute, hashHistory } from 'react-router'

import Login from './containers/login'
import Projects from './containers/projects'

import Layout from './layout/main'

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Login}/>
          <Route path='/projects' component={Projects}/>
        </Route>
      </Router>
    );
  }
}

export default App
