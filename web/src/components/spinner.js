import React from 'react'

const Spinner = () => {
  return (
    <div class="slds-spinner_container">
      <div role="status" class="slds-spinner slds-spinner--medium">
        <span class="slds-assistive-text">Loading</span>
        <div class="slds-spinner__dot-a"></div>
        <div class="slds-spinner__dot-b"></div>
      </div>
    </div>
  )
}

export default Spinner
