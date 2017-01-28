import React, { PropTypes } from 'react'

const ProjectTableRowInput = (props) => {
  return (
    <td>
      <input className="slds-input" type="number" value={props.hours} onChange={props.onChange.bind(this)}/>
    </td>
  )
}

ProjectTableRowInput.propTypes = {
  hours: PropTypes.number,
  onChange: PropTypes.func
}

export default ProjectTableRowInput
