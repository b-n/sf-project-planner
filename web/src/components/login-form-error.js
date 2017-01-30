import React from 'react'

const LoginFormError = (props) => {
  const { errorMessage } = props
  return <div className="slds-m-vertical--small slds-text-color--error">{errorMessage}</div>
}

export default LoginFormError
