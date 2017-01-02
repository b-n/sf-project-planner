import React, { PropTypes } from 'react'

const ProjectTableHeaderCol = (props) => {
  return (
    <th scope='col'>
      <div className='slds-truncate'>{props.colName}</div>
    </th>
  )
}

ProjectTableHeaderCol.propTypes = {
  colName: PropTypes.string
}

export default ProjectTableHeaderCol
