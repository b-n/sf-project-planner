import React from 'react'
import {Router, Route, IndexRoute, hashHistory } from 'react-router'

import Login from './pages/login'
import Projects from './pages/projects'

import GlobalLayout from './layout/global-layout'
import './App.css'

const App = () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={GlobalLayout}>
        <IndexRoute component={Login}/>
        <Route path='/projects' component={Projects}/>
      </Route>
    </Router>
  )
}

export default App
