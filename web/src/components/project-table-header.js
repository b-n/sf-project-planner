import React from 'react'

import ProjectTableHeaderCol from './project-table-header-col'

const ProjectTableHeader = (props) => {

  return (
    <thead>
      <tr className='slds-text-title--caps'>
        <ProjectTableHeaderCol colName='Project'/>
        {
          props.weeksArray.map(week => {
            return <ProjectTableHeaderCol colName={week} key={week}/>
          })
        }
      </tr>
    </thead>
  )
}

export default ProjectTableHeader
