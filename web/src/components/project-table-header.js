import React from 'react'

import ProjectTableHeaderCol from './project-table-header-col'

const ProjectTableHeader = (props) => {

  return (
    <thead>
      <tr className='slds-text-title--caps'>
        <ProjectTableHeaderCol colName='Project'/>

        {
          Array.from({length: props.weekTo - props.weekFrom}, (value, index) => props.weekFrom + value)
            .map((week, index) =>{
              return <ProjectTableHeaderCol colName={`Week ${week}`} key={index}/>
            }
          )
        }
      </tr>
    </thead>
  )
}

export default ProjectTableHeader
