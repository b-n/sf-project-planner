import React, { PropTypes } from 'react'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'

import GlobalHeader from './global-header'
import GlobalFooter from './global-footer'

const GlobalLayout = (props) => {
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

GlobalLayout.propTypes = {
  children: PropTypes.element
}

export default GlobalLayout
