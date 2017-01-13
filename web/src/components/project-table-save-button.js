import React, { PropTypes } from 'react'

const ProjectTableSaveButton = (props) => {
  return (
    <div className='slds-m-top--small slds-float--right'>
      <button className='slds-button slds-button--brand'>Update Resources</button>
    </div>
  )
}

ProjectTableSaveButton.propTypes = {
  submit: PropTypes.func
}


export default ProjectTableSaveButton
