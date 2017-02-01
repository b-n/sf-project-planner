import React, { PropTypes } from 'react'

const Toaster = (props) => {
  return (
    <div className='slds-notify_container'>
      <div class='slds-notify slds-notify--toast slds-theme' role="alert">
        <span className='slds-assistive-text'>Info</span>
        <button className='slds-button slds-notify__close slds-button--icon-inverse' title='Close'>
          <svg className='slds-button__icon slds-button__icon--large' aria-hidden='true'>
            <use xlink:href='/assets/icons/utility-sprite/svg/symbols.svg#close'></use>
          </svg>
          <span className='slds-assistive-text'>Close</span>
        </button>
        <div className='slds-notify__content'>
          <h2 className='slds-text-heading--small'>{props.message}</h2>
        </div>
      </div>
    </div>
  )
}

Toaster.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.bool.isRequired
}

export default Toaster
