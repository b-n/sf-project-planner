import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginFormInput from './login-form-input'
import LoginFormSubmit from './login-form-submit'

class LoginForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }

  submit(e){
    e.preventDefault()
  }

  render() {
    return (
      <form className='slds-form--stacked' onSubmit={this.submit}>
        <LoginFormInput label='Username' id='username' type='text' placeholder='username@beethree.nl' />
        <LoginFormInput label='Password' id='password' type='password' placeholder='password' />
        <LoginFormSubmit label='Login' />
      </form>
    )
  }
}

const mapStateToProps = (state) =>  {
  return {
    loggedIn: state.loggedIn,
    shouldRedirect: state.shouldRedirect,
    displayError: state.displayError,
    displaySpinner: state.displaySpinner
  }
}


export default connect(mapStateToProps)(LoginForm)
