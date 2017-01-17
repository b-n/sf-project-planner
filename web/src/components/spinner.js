import React, { PropTypes } from 'react'

const Spinner = (props) => {
  return (
    <div className={props.show ? 'slds-show' : 'slds-hide'}>
      <div className='slds-spinner_container'>
        <div role='status' className='slds-spinner slds-spinner--medium slds-spinner--brand'>
          <span className='slds-assistive-text'>Loading</span>
          <div className='slds-spinner__dot-a'></div>
          <div className='slds-spinner__dot-b'></div>
        </div>
      </div>
    </div>
  )
}

Spinner.propTypes = {
  show: PropTypes.bool.isRequired
}

export default Spinner
