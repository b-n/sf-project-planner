import React from 'react'

import Logo from '../components/logo'

const GlobalHeader = () => {
  return (
    <header className='slds-global-header_container'>
      <div className='slds-global-header slds-grid slds-grid--align-spread'>
        <div className='slds-global-header__item'>
          <div className='slds-global-header__logo'>
            <Logo/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default GlobalHeader
