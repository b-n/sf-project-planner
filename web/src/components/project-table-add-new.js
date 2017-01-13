import React, { PropTypes } from 'react'

const ProjectTableAddNew = (props) => {
  return (
    <button className='slds-button slds-button--neutral slds-not-selected slds-m-top--small slds-float--left' onClick={props.onClick}>
      <span className='slds-text-not-selected'>Add New</span>
    </button>
  )
}

ProjectTableAddNew.propTypes = {
  onClick: PropTypes.func
}

export default ProjectTableAddNew
