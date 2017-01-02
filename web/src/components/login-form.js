import React, { Component } from 'react'

import LoginFormInput from './login-form-input'
import LoginFormSubmit from './login-form-submit'

class LoginForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }
  submit() {

  }
  render() {
    return (
      <form className='slds-form--stacked'>
        <LoginFormInput label='Username' id='username' type='text' placeholder='username@beethree.nl' />
        <LoginFormInput label='Password' id='password' type='password' placeholder='password' />
        <LoginFormSubmit label='Login' submit={this.submit} />
      </form>
    )
  }
}


export default LoginForm
