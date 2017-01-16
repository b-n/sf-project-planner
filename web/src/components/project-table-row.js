import React, { PropTypes } from 'react'

import ProjectTableRowInput from './project-table-row-input'

const ProjectTableRow = (props) => {
  return (
    <tr>
      <td>
        <input onChange={props.onChange} value={props.name} />
      </td>
      {Array.from(Array(props.weekTo - props.weekFrom).keys()).map((__, index) =>{
        return <ProjectTableRowInput key={index}/>
      })}
      <td>
        <button onClick={ () => { props.removeHandler(props.index) } }>Remove</button>
      </td>
    </tr>
  )
}

ProjectTableRow.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  onChange: PropTypes.func,
  removeHandler: PropTypes.func
}

export default ProjectTableRow
