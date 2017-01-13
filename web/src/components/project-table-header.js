import React from 'react'

import ProjectTableHeaderCol from './project-table-header-col'

const ProjectTableHeader = (props) => {
  return (
    <thead>
      <tr className='slds-text-title--caps'>
        <ProjectTableHeaderCol colName='Project'/>
        {Array.from(Array(props.weekTo - props.weekFrom).keys()).map((__, index) =>{
          return <ProjectTableHeaderCol colName={`week ${index + 1}`} key={index}/>
        })}
      </tr>
    </thead>
  )
}

export default ProjectTableHeader
