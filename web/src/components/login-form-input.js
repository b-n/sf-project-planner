import React from 'react'

const LoginFormInput = (props) => {
  return (
    <div className='slds-form-element'>
      <label className='slds-form-element__label' htmlFor={props.id}>{props.label}</label>
      <div className='slds-form-element__control'>
        <input id={props.id} className='slds-input' type={props.type} placeholder={props.placeholder} />
      </div>
    </div>
  )
}

export default LoginFormInput
