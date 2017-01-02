import React from 'react'

import ProjectTableHeaderCol from './project-table-header-col'

const ProjectTableHeader = () => {
  return (
    <thead>
      <tr className='slds-text-title--caps'>
        <ProjectTableHeaderCol colName='Id'/>
        <ProjectTableHeaderCol colName='Project Name'/>
        <ProjectTableHeaderCol colName='Customer'/>
        <ProjectTableHeaderCol colName='Resources'/>
      </tr>
    </thead>
  )
}

export default ProjectTableHeader
