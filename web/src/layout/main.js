import React from 'react'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'

import Header from './header'
import Footer from './footer'

const Layout = (props) => {
  return (
    <div className='slds'>
      <Header/>
      <main>
        {props.children}
      </main>
      <Footer/>
    </div>
  )
}

Layout.propTypes = {
  children: React.element
}

export default Layout
