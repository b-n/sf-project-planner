import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/project'

import ProjectTableDatePicker from './project-table-date-picker'
import ProjectTableHeader from './project-table-header'
import ProjectTableRow from './project-table-row'
import ProjectTableSaveButton from './project-table-save-button'
import ProjectAddNew from './project-table-add-new'
import Spinner from './spinner'

class ProjectTable extends Component {

  constructor() {
      super()
      this.addProject = this.addProject.bind(this)
      this.removeProjectHandler = this.removeProjectHandler.bind(this)
      this.saveToServer = this.saveToServer.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(actionCreators.getResources())
    this.props.dispatch(actionCreators.fetchProjects())
  }

  addProject() {
    this.props.dispatch(actionCreators.addProject())
  }

  removeProjectHandler(projectId) {
    this.props.dispatch(actionCreators.removeProject(projectId))
  }

  saveToServer() {
    this.props.dispatch(actionCreators.saveToServer())
  }

  render() {
    return (
      <div>
        <Spinner show={this.props.fetchingProjects}/>
        <ProjectTableDatePicker/>
        <table className='slds-table slds-table--bordered slds-table--fixed-layout' role='grid'>
          <ProjectTableHeader weekFrom={this.props.weekFrom} weekTo={this.props.weekTo}/>
          <tbody>
            {
              this.props.projects.map((project, index) => {
                return <ProjectTableRow
                  project={project}
                  key={project.id}
                  weekFrom={this.props.weekFrom}
                  weekTo={this.props.weekTo}
                  removeHandler={this.removeProjectHandler}
                />
              })
            }
          </tbody>
        </table>
        <ProjectAddNew onClick={this.addProject} />
        <ProjectTableSaveButton onClick={this.saveToServer} />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    projects: state.projects.projectData,
    weekFrom: state.projects.weekFrom,
    weekTo: state.projects.weekTo,
    fetchingProjects: state.projects.fetchingProjects
  }
}


export default connect(mapStateToProps)(ProjectTable)
