import React, { Component } from 'react'

import LoginForm from '../components/login-form'
import Logo from '../components/logo'

const Login = () => {
  return (
    <div id="form-wrapper" className="slds-container--center slds-container--small">
      <div id="form-logo">
      <Logo/>
      </div>
      <LoginForm />
    </div>
  )
}

export default Login
