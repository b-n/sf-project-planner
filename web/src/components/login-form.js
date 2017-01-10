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
    const { username, password } = this.refs
    this.props.dispatch(actionCreators.loginAttempt(username, password))
  }

  componentWillUpdate() {
    console.log('component will update!')
    const { router } = this.context
    if (this.props.shouldRedirect)
      router.transition('/projects')
  }

  render() {
    return (
      <form className='slds-form--stacked' onSubmit={this.submit}>
        <LoginFormInput label='Username' ref='username' type='text' placeholder='username@beethree.nl' />
        <LoginFormInput label='Password' ref='password' type='password' placeholder='password' />
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
