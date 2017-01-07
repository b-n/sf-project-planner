import React, { PropTypes } from 'react'

const LoginFormSubmit = (props) => {
  return (
    <div className='slds-form-element'>
      <button className='slds-button slds-button--brand'>{props.label}</button>
    </div>
  )
}

LoginFormSubmit.propTypes = {
  label: PropTypes.string
}

export default LoginFormSubmit
