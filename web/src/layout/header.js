import React from 'react'

import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className='slds-global-header_container'>
      <div className='slds-global-header slds-grid slds-grid--align-spread'>
        <div className='slds-global-header__item'>
          <div className='slds-global-header__logo'>
            <img src={Logo} alt='logo'/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
