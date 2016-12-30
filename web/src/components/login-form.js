import React, { Component } from 'react'
import { Link } from 'react-router'

class LoginForm extends Component {
  render() {
    return (
      <form>
        <div className='slds-form-element'>
          <label className='slds-form-element__label' for='username'>Username</label>
          <div className='slds-form-element__control'>
            <input id='username' className='slds-input' type='text' placeholder='username' />
          </div>
        </div>
        <div className='slds-form-element'>
          <label className='slds-form-element__label' for='password'>Password</label>
          <div className='slds-form-element__control'>
            <input id='password' className='slds-input' type='password' placeholder='password' />
          </div>
        </div>
        <button className='slds-button--brand'>Login</button>
      </form>
    )
  }
}

export default LoginForm
