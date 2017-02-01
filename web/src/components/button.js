import React, { PropTypes } from 'react'
import utility from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg'

const Button = (props) => {

  const { type, onClick, className, label, iconName } = props

  const iconPosition = props.iconPosition || 'left'

  const buttonClassName = 'slds-button ' + (type ? 'slds-button--' + type : '') + ' ' + className

  return (
    <button className={buttonClassName} onClick={onClick}>
      {
        iconName && iconPosition === 'left'
          ?  <svg className="slds-button__icon slds-button__icon--left">
              <use xlinkHref={utility + '#' + iconName}></use>
             </svg>
          : null
      }
      {label}
      {
        iconName && iconPosition === 'right'
          ?  <svg className="slds-button__icon slds-button__icon--right">
              <use xlinkHref={utility + '#' + iconName}></use>
             </svg>
          : null
      }
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  iconName: PropTypes.string,
  iconPosition: PropTypes.string
}

export default Button
