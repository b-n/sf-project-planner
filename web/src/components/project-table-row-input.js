import React from 'react'

const ProjectTableRowInput = (props) => {
  return (
    <td>
      <input className="slds-input" value={props.week.Hours__c}/>
    </td>
  )
}

export default ProjectTableRowInput
