import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/login'

import LoginFormInput from './login-form-input'
import LoginFormSubmit from './login-form-submit'

// TODO: ADD proptypes
class LoginForm extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }
  submit(e){
    e.preventDefault()
    this.props.attemptLogin()
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
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    attemptLogin: () => {
      dispatch(actions.loginAttempt(ownProps.username, ownProps.password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
