import React, { PropTypes } from 'react'

import ProjectTableRowInput from './project-table-row-input'

const ProjectTableRow = (props) => {

  const { name, id, displayValues } = props.project
  console.log(displayValues);

  return (
    <tr>
      <td>
        <input className="slds-input" value={name} readOnly/>
      </td>
      { displayValues.map((week, index) =>{
        return <ProjectTableRowInput key={index} week={week}/>
      })}
      <td>
        <button onClick={ () => { props.removeHandler(id) } }>Remove</button>
      </td>
    </tr>
  )
}

ProjectTableRow.propTypes = {
  project: PropTypes.object,
  weekFrom: PropTypes.object,
  weekTo: PropTypes.object,
  removeHandler: PropTypes.func
}

export default ProjectTableRow
