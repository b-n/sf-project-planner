import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProjectTableHeader from './project-table-header'
import ProjectTableRow from './project-table-row'

class ProjectTable extends Component {
  render() {
    return (
      <table className='slds-table slds-table--bordered slds-table--fixed-layout' role='grid'>
        <ProjectTableHeader />
        <tbody>
          {this.props.projects.map((project) => {
            return <ProjectTableRow {...project} key={project.id} />
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


export default connect(mapStateToProps)(ProjectTable)
