import React from 'react'

const LoginFormSubmit = (props) => {
  return (
    <div className='slds-form-element'>
      <button className='slds-button slds-button--brand' onClick={props.submit}>{props.label}</button>
    </div>
  )
}

export default LoginFormSubmit
