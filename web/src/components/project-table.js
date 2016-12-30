import React from 'react'

import ProjectTableHeader from './project-table-header'
import ProjectTableRow from './project-table-row'

const ProjectTable = (props) => {
  return (
    <table>
      <ProjectTableHeader />
      <tbody>
        {this.props.projects.map(project) => {
          return <ProjectTableRow project={project} />
        }}
      </tbody>
    </table>
  )
}

export default ProjectTable
