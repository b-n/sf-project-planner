 import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoginFormInput from './login-form-input'
import LoginFormSubmit from './login-form-submit'
import LoginFormError from './login-form-error'
import Spinner from './spinner'

import * as actionCreators from '../actions/login'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.state = {
        username: '',
        password: ''
    }
  }

  componentDidUpdate() {
    if (this.props.loggedIn) this.context.router.push('/projects')
  }

  submit(e) {
    e.preventDefault()
    this.props.dispatch(actionCreators.loginAttempt(this.state.username, this.state.password))
  }

  changeUsername(e) {
    this.setState({ username: e.target.value })
  }

  changePassword(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    const { isLoading, errorMessage } = this.props

    const error = errorMessage !== ''
      ?  <LoginFormError errorMessage={errorMessage} />
      : null

    return (
      <div>
        <Spinner show={isLoading} />
        <form className='slds-form--stacked' onSubmit={this.submit}>
          <LoginFormInput label='Username' type='text' placeholder='username@beethree.nl' onChange={this.changeUsername} />
          <LoginFormInput label='Password' type='password' placeholder='password' onChange={this.changePassword} />
          {error}
          <LoginFormSubmit label='Login' />
        </form>
      </div>
    )
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>  {
  return {
    ...state.login
  }
}


export default connect(mapStateToProps)(LoginForm)
