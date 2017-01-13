import React, { PropTypes } from 'react'

import ProjectTableRowInput from './project-table-row-input'

const ProjectTableRow = (props) => {
  return (
    <tr>
      <td>
        <input value={props.name} />
      </td>
      {Array.from(Array(props.weekTo - props.weekFrom).keys()).map((__, index) =>{
        return <ProjectTableRowInput key={index}/>
      })}
    </tr>
  )
}

ProjectTableRow.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string
}

export default ProjectTableRow
