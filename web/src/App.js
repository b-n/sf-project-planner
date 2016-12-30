import React from 'react'
import {Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import Login from './pages/login'
import Projects from './pages/projects'
import GlobalLayout from './layout/global-layout'

import { store } from './store'

import './app.css'

const App = () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={GlobalLayout}>
          <IndexRoute component={Login}/>
          <Route path='/projects' component={Projects}/>
        </Route>
      </Router>
    </Provider>
  )
}

export default App
