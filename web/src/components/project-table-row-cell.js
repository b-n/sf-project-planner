import React, { PropTypes } from 'react'

const ProjectTableRowCell = (props) => {
  return (
    <td>
      <div className='slds-truncate'>{props.value}</div>
    </td>
  )
}

ProjectTableRowCell.propType = {
  value: PropTypes.Object
}

export default ProjectTableRowCell
