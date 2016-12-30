import React from 'react'

import ProjectTableRow from './project-table-row'

const ProjectTable = (props) => {
  return (
    <table>
      {this.props.projects.map(project) => {
        return <ProjectTableRow project={project} />
      }}
    </table>
  )
}

export default ProjectTable
