import React from 'react'

import ProjectTableHeaderCol from './project-table-header-col'

const ProjectTableHeader = (props) => {

  return (
    <thead>
      <tr className='slds-text-title--caps'>
        <ProjectTableHeaderCol colName='Project'/>
        <ProjectTableHeaderCol colName='Status' />
        {
          props.weeksArray.map(week => {
            return <ProjectTableHeaderCol colName={week} key={week}/>
          })
        }
        <ProjectTableHeaderCol colName='Action' />
      </tr>
    </thead>
  )
}

export default ProjectTableHeader
