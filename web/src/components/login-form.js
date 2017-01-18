 import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoginFormInput from './login-form-input'
import LoginFormSubmit from './login-form-submit'
import Spinner from './spinner'

import * as actionCreators from '../actions/login'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
        username: '',
        password: ''
    }
  }

  componentDidUpdate() {
    if (this.props.loggedIn)
      this.context.router.push('/projects')
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
    return (
      <div>
        <Spinner show={this.props.displaySpinner}/>
        <form className='slds-form--stacked' onSubmit={this.submit}>
          <LoginFormInput label='Username' type='text' placeholder='username@beethree.nl' onChange={e=>this.changeUsername(e)} />
          <LoginFormInput label='Password' type='password' placeholder='password' onChange={e=>this.changePassword(e)} />
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
    loggedIn: state.login.loggedIn,
    displayError: state.login.displayError,
    displaySpinner: state.login.displaySpinner
  }
}


export default connect(mapStateToProps)(LoginForm)
