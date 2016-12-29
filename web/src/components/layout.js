import React from 'react'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'

const Layout = (props) => {
  return (
    <div className='slds'>
      <header>this is a header</header>
      <div>{props.children}</div>
      <footer>this is a footer</footer>
    </div>
  )
}

export default Layout
