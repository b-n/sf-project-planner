import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { LOGIN_ATTEMPT } from '../actions/action-types'

import LoginFormInput from './login-form-input'
import LoginFormSubmit from './login-form-submit'

// TODO: ADD proptypes
class LoginForm extends Component {
  constructor(props) {
    super(props)
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
      dispatch(LOGIN_ATTEMPT)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
