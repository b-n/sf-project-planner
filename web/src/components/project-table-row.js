import React from 'react'

const ProjectTableRow = (props) => {
  return (
    <tr>
      <th>{JSON.stringify(props.project, null, 4)}</th>
    </tr>
  )
}

export default ProjectTableRow
