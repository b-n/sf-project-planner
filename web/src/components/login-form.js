import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginFormInput from './login-form-input'
import LoginFormSubmit from './login-form-submit'

import * as actionCreators from '../actions/login'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(e){
    e.preventDefault()
    this.props.dispatch(actionCreators.loginAttempt('',''))
  }

  render() {
    return (
      <form className='slds-form--stacked' onSubmit={this.submit}>
        <LoginFormInput label='Username' type='text' placeholder='username@beethree.nl' />
        <LoginFormInput label='Password' type='password' placeholder='password' />
        <LoginFormSubmit label='Login' />
      </form>
    )
  }
}

const mapStateToProps = (state) =>  {
  return {
    loggedIn: state.loggedIn,
    displayError: state.displayError,
    displaySpinner: state.displaySpinner
  }
}


export default connect(mapStateToProps)(LoginForm)
