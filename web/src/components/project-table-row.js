import React from 'react'

const ProjectTableRow = (props) => {
  return (
    <tr>
      <td>
        <div className='slds-truncate'>{props.project.id}</div>
      </td>
      <td>
        <div className='slds-truncate'>{props.project.name}</div>
      </td>
      <td>
        <div className='slds-truncate'>{props.project.customer}</div>
      </td>
      <td>
        <div className='slds-truncate'>{props.project.resources}</div>
      </td>
    </tr>
  )
}

export default ProjectTableRow
