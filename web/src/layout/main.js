import React from 'react'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'

import GlobalHeader from './global-header'
import GlobalFooter from './global-footer'

const Layout = (props) => {
  return (
    <div className='slds'>
      <GlobalHeader/>
      <main>
        {props.children}
      </main>
      <GlobalFooter/>
    </div>
  )
}

Layout.propTypes = {
  children: React.element
}

export default Layout
