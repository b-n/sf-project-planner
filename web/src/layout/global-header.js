import React from 'react'

import Logo from '../components/logo'

import utility from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg'

const GlobalHeader = () => {
  return (
    <header className='slds-global-header_container'>
      <div className='slds-global-header slds-grid slds-grid--align-spread'>
        <div className='slds-global-header__item'>
          <div className='slds-global-header__logo'>
            <Logo/>
          </div>
        </div>
        <div className='slds-global-header__item'>
          <div className='slds-text-heading--medium'>
            Resource Planning
          </div>
        </div>
        <div className='slds-global-header__item'>
          <a href="http://www.beethree.nl" className='slds-button slds-button--icon' title="Back to beethree.nl">
            <svg className="slds-button__icon slds-button__icon--large" aria-hidden="true">
              <use xlinkHref={utility + '#close'}></use>
            </svg>
            <span className="slds-assistive-text">Back to beethree.nl</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default GlobalHeader
