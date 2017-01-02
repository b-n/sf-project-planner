import React from 'react'

const ProjectTableHeader = () => {
  return (
    <thead>
      <tr className='slds-text-title--caps'>
        <th scope='col'>
          <div className='slds-truncate'>ID</div>
        </th>
        <th scope='col'>
          <div className='slds-truncate'>Project Name</div>
        </th>
        <th scope='col'>
          <div className='slds-truncate'>Customer</div>
        </th>
        <th scope='col'>
          <div className='slds-truncate'>Resources</div>
        </th>
      </tr>
    </thead>
  )
}

export default ProjectTableHeader
