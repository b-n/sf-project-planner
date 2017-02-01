import React, { PropTypes } from 'react'
import utility from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg'
import classnames from 'classnames'

const Toast = (props) => {

  const toastClass = classnames('slds-notify slds-notify--toast',
    {
      'slds-theme--success': props.type === 'success',
      'slds-theme--warning': props.type === 'warning',
      'slds-theme--error': props.type === 'error',
      'slds-hide': !props.show
    }
  );

  if (props.show) {
    window.setTimeout(() => props.hideToast(), 3000);
  }

  return (
    <div className='slds-notify_container'>
      <div className={toastClass} role="alert">
        <span className='slds-assistive-text'>Info</span>
        <button onClick={props.hideToast} className='slds-button slds-notify__close slds-button--icon-inverse' title='Close'>
          <svg className="slds-button__icon slds-button__icon--large">
            <use xlinkHref={utility + '#close'}></use>
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

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  show: PropTypes.bool.isRequired,
  hideToast: PropTypes.func.isRequired
}

export default Toast