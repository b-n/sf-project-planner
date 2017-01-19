import React, { PropTypes } from 'react'
import moment from 'moment'

import ProjectTableRowInput from './project-table-row-input'

const ProjectTableRow = (props) => {

  const { weekFrom, weekTo } = props
  const numberOfWeeks = weekTo.diff(weekFrom, 'week')
  const weeksArray = Array.from({ length: numberOfWeeks }, (value, index) => moment(weekFrom).add(index, 'week').format('YYYY-MM-DD'))

  const { name, id } = props.project

  return (
    <tr>
      <td>
        <input value={name} readOnly/>
      </td>
      { weeksArray.map((__, index) =>{
        return <ProjectTableRowInput key={index}/>
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
