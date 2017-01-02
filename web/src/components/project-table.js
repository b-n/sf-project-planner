import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProjectTableHeader from './project-table-header'
import ProjectTableRow from './project-table-row'

class ProjectTable extends Component {
  render() {
    return (
      <table>
        <ProjectTableHeader />
        <tbody>
          {this.props.projects.map((project) => {
            return <ProjectTableRow project={project} key={project.id}/>
          })}
        </tbody>
      </table>
    )
  }
}


const mapStateToProps = (state) =>  {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTable)
